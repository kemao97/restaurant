import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

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

const alertInit = {
  color: undefined,
  message: undefined,
};

export default compose(
  withRouter,
  withState('form', 'updateForm', formInit),
  withState('alert', 'updateAlert', alertInit),
  graphql(CREATE_FOOD_QUERY, {name: 'createFoodQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({createFoodQuery, form, history, dispatch, updateAlert}) => async (e) => {
      e.preventDefault();
      try {
        await updateAlert(alertInit);
        await createFoodQuery({
          variables: {
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
);
