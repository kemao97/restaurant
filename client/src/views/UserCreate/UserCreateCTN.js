import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

const CREATE_USER_QUERY = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

const formInit = {
  email: '',
  password: '',
};

const alertInit = {
  color: undefined,
  message: undefined,
};

export default compose(
  withRouter,
  withState('form', 'updateForm', formInit),
  withState('alert', 'updateAlert', alertInit),
  graphql(CREATE_USER_QUERY, {name: 'createUserQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({createUserQuery, form, history, dispatch, updateAlert}) => async (e) => {
      e.preventDefault();
      try {
        await updateAlert(alertInit);
        await createUserQuery({
          variables: {
            input: form,
          },
        });
        history.push('/users');
      } catch (e) {
        updateAlert({
          color: 'error',
          message: 'Có lỗi xảy ra',
        });
      }
    },
  }),
);
