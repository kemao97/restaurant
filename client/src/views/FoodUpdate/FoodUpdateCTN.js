import {branch, compose, lifecycle, withHandlers, withProps, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {get, pick} from 'lodash';

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
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    onSubmit: ({id, updateFoodQuery, form, history, updateForm}) => async (e) => {
      e.preventDefault();
      updateForm((prev) => ({
        ...prev,
        errors: undefined,
        price: prev.price || '0',
      }));
      form.price = parseInt(form.price) || 0;
      const data = await updateFoodQuery({
        variables: {
          id,
          input: pick(form, [
            'name',
            'price',
            'description',
          ]),
        },
      });
      if (get(data, 'data.updateFood')) {
        history.push('/foods');
      } else {
        await data.handleFormErrors({updateForm});
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
