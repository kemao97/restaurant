import {gql} from 'apollo-boost';
import {branch, compose, lifecycle, withHandlers, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';
import {findIndex, get} from 'lodash';
import {withRouter} from 'react-router-dom';

const CART_QUERY = gql`
  query cartDetails {
    viewer {
      cartWorking {
        cartDetails {
          id
          quantity
          food {
            id
            name
            description
            price
            foodAttachments {
              path
            }
          }
        }
      }
    }
  }
`;

const UPSERT_CART_QUERY = gql`
  mutation upsertCartDetail($input: CartDetailInput) {
    upsertCartDetail(input: $input) {
      id
      quantity
    }
  }
`;

const DELETE_CART_QUERY = gql`
  mutation deleteCartDetail($id: ID!) {
    deleteCartDetail(id: $id)
  }
`;

const CHECKOUT_QUERY = gql`
  mutation checkoutCart {
    checkoutCart {
      id
    }
  }
`;

const calcTotalMoney = (cartDetails) => {
  let totalMoney = 0;
  cartDetails.forEach((cartDetail) => {
    totalMoney += cartDetail.quantity * cartDetail.food.price;
  });
  return totalMoney;
};

export default compose(
  graphql(CART_QUERY, {name: 'cartQuery'}),
  graphql(UPSERT_CART_QUERY, {name: 'upsertCartQuery'}),
  graphql(DELETE_CART_QUERY, {name: 'deleteCartDetail'}),
  graphql(CHECKOUT_QUERY, {name: 'checkoutCart'}),
  withRouter,
  branch(
    ({cartQuery}) => cartQuery.viewer,
    withProps(({cartQuery}) => {
      const cartDetails = cartQuery.viewer.cartWorking.cartDetails;
      const totalMoney = calcTotalMoney(cartDetails);
      return {
        cartProp: {
          cartDetails,
          totalMoney,
        },
      };
    }),
  ),
  withState('cart', 'updateCart', ({cartProps}) => cartProps),
  withHandlers({
    handleCountChange: ({upsertCartQuery, cart, updateCart}) => (food) => async (quantity) => {
      await upsertCartQuery({
        variables: {
          input: {
            foodId: food.id,
            quantity,
          },
        },
      });
      const pos = findIndex(cart.cartDetails, function(cartDetail) {
        return get(cartDetail, 'food.id') === food.id;
      });
      if (pos !== -1) {
        cart.cartDetails[pos].quantity = quantity;
        cart.totalMoney = calcTotalMoney(cart.cartDetails);
        updateCart(cart);
      }
    },
    handleDeleteCart: ({cart, updateCart, deleteCartDetail}) => (cartDetailId) => async () => {
      await deleteCartDetail({
        variables: {
          id: cartDetailId,
        },
      });
      const pos = findIndex(cart.cartDetails, function(cartDetail) {
        return cartDetail.id === cartDetailId;
      });
      if (pos !== -1) {
        cart.cartDetails.splice(pos, 1);
        cart.totalMoney = calcTotalMoney(cart.cartDetails);
        updateCart(cart);
      }
    },
    handleCheckout: ({checkoutCart, history}) => async () => {
      await checkoutCart();
      history.push('/');
    },
  }),
  lifecycle({
    componentDidMount() {
      const {cartProp, updateCart} = this.props;
      if (cartProp) {
        updateCart(cartProp);
      }
    },
  }),
);
