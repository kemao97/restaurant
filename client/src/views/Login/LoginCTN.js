import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {login} from '../../redux/actions/viewer';
import {get, pick} from 'lodash';

const LOGIN_QUERY = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
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
  graphql(LOGIN_QUERY, {name: 'loginQuery'}),
  withHandlers({
    onChange: ({updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm((prev) => ({
        ...prev,
        [name]: value,
        errors: {
          ...prev.errors,
          [name]: null,
        },
      }));
    },
    onSubmit: ({loginQuery, form, history, dispatch, updateForm}) => async (e) => {
      e.preventDefault();
      await updateForm((prev) => ({
        ...prev,
        errors: undefined,
      }));
      const data = await loginQuery({
        variables: {
          input: pick(form, [
            'email',
            'password',
          ]),
        },
      });
      const user = get(data, 'data.login');
      if (user) {
        await dispatch(login(user));
        history.push('/');
      } else {
        await data.handleFormErrors({updateForm});
      }
    },
  }),
);
