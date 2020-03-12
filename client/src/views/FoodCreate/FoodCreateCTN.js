import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {get, pick} from 'lodash';

const CREATE_FOOD_QUERY = gql`
  mutation createFood($input: CreateFoodInput!) {
    createFood(input: $input) {
      id
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
  withState('form', 'updateForm', formInit),
  graphql(CREATE_FOOD_QUERY, {name: 'createFoodQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({createFoodQuery, form, history, updateForm}) => async (e) => {
      e.preventDefault();
      updateForm((prev) => ({
        ...prev,
        errors: undefined,
        price: prev.price || '0',
      }));
      form.price = parseInt(form.price) || 0;
      const data = await createFoodQuery({
        variables: {
          input: pick(form, [
            'name',
            'price',
            'description',
          ]),
        },
      });
      if (get(data, 'data.createFood')) {
        history.push('/foods');
      } else {
        await data.handleFormErrors({updateForm});
      }
    },
  }),
);
