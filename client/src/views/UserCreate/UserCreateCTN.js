import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {get, pick} from 'lodash';

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

export default compose(
  withRouter,
  withState('form', 'updateForm', formInit),
  graphql(CREATE_USER_QUERY, {name: 'createUserQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({createUserQuery, form, history, updateForm}) => async (e) => {
      e.preventDefault();
      try {
        await updateForm((prev) => ({
          ...prev,
          errors: undefined,
        }));
        const data = await createUserQuery({
          variables: {
            input: pick(form, [
              'email',
              'password',
            ]),
          },
        });
        if (get(data, 'data.createUser')) {
          history.push('/users');
        } else {
          await data.handleFormErrors({updateForm});
        }
      } catch (e) {
        console.log(e);
      }
    },
  }),
);
