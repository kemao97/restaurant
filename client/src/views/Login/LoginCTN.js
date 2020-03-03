import {compose, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {login} from '../../redux/actions/viewer';
import {get} from 'lodash';

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

const alertInit = {
  color: undefined,
  message: undefined,
};

export default compose(
  withRouter,
  withState('form', 'updateForm', formInit),
  withState('alert', 'updateAlert', alertInit),
  graphql(LOGIN_QUERY, {name: 'loginQuery'}),
  withHandlers({
    onChange: ({form, updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm({
        ...form,
        [name]: value,
      });
    },
    onSubmit: ({loginQuery, form, history, dispatch, updateAlert}) => async (e) => {
      e.preventDefault();
      try {
        await updateAlert(alertInit);
        const data = await loginQuery({
          variables: {
            input: form,
          },
        });
        const user = get(data, 'data.login');
        await dispatch(login(user));
        history.push('/users');
      } catch (e) {
        updateAlert({
          color: 'error',
          message: 'Email or password not valid',
        });
      }
    },
  }),
);
