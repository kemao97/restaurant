import {branch, compose, lifecycle, withHandlers, withProps, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

const FOOD_QUERY = gql`
  query food($id: ID!) {
    food(id: $id) {
      name
      description
      price
    }
  }
`;

const UPDATE_FOOD_QUERY = gql`
  mutation updateFood($id: ID!, $input: UpdateFoodInput!) {
    updateFood(id: $id, input: $input) {
      name
      description
      price
    }
  }
`;

const formInit = {
  name: '',
  description: '',
  price: null,
};

const alertInit = {
  color: undefined,
  message: undefined,
};

export default compose(
  withRouter,
  withProps(({id, match}) => ({
    id: id || match.params.id,
  })),
  graphql(FOOD_QUERY, {name: 'foodQuery'}),
  graphql(UPDATE_FOOD_QUERY, {name: 'updateFoodQuery'}),
  branch(
    ({foodQuery}) => !foodQuery.loading && !foodQuery.error,
    withProps(({foodQuery}) => ({food: foodQuery.food})),
  ),
  withState('form', 'updateForm', formInit),
  withState('alert', 'updateAlert', alertInit),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    onSubmit: ({id, updateFoodQuery, form, history, updateAlert}) => async (e) => {
      e.preventDefault();
      try {
        await updateAlert(alertInit);
        await updateFoodQuery({
          variables: {
            id,
            input: {
              ...form,
              price: parseInt(form.price) || null,
            },
          },
        });
        history.push('/foods');
      } catch (e) {
        updateAlert({
          color: 'error',
          message: 'Có lỗi xảy ra',
        });
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const {updateForm, food} = this.props;
      food && updateForm({
        name: food.name,
        description: food.description,
        price: food.price,
      });
    },
  }),
);
