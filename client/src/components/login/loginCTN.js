import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';

const LOGIN_QUERY = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

const formInit = {
  email: '',
  password: '',
};

export default compose(
  withState('form', 'updateForm', formInit),
  graphql(LOGIN_QUERY, {name: 'loginQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({loginQuery, form}) => async (e) => {
      e.preventDefault();
      try {
        await loginQuery({
          variables: {
            input: form,
          },
        });
      } catch (e) {
        console.log('[client]: error submit form login');
      }
    },
  }),
);
