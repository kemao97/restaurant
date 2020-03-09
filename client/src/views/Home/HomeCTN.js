import {gql} from 'apollo-boost';
import {branch, compose, withHandlers, withProps} from 'recompose';
import {graphql} from '@apollo/react-hoc';

const FOOD_QUERY = gql`
  query ($option: FoodPageOptions) {
    foods(options: $option) {
      foods {
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
`;

const UPSERT_CART_QUERY = gql`
  mutation upsertCartDetail($input: CartDetailInput) {
    upsertCartDetail(input: $input) {
      id
      quantity
    }
  }
`;

export default compose(
  graphql(FOOD_QUERY, {name: 'foodQuery'}),
  graphql(UPSERT_CART_QUERY, {name: 'upsertCartQuery'}),
  branch(
    ({foodQuery}) => !foodQuery.error && !foodQuery.loading,
    withProps(({foodQuery}) => ({foods: foodQuery.foods.foods})),
  ),
  withHandlers({
    handleAddToCart: ({upsertCartQuery}) => (foodId) => () => {
      upsertCartQuery({
        variables: {
          input: {
            foodId,
            quantity: 1,
          },
        },
      });
    },
  }),
);
