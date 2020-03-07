import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';
import {login} from '../../redux/actions/viewer';
import {get, merge} from 'lodash';

const LOGIN_QUERY = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      id
      email
    }
  }
`;

const formInit = {
  email: {
    error: null,
    value: '',
  },
  password: {
    error: null,
    value: '',
  },
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
    onChange: ({updateForm}) => async (e) => {
      const {value, name} = e.target;
      updateForm((prev) => merge(
        prev,
        {[name]: {value, error: null}},
      ));
    },
    onSubmit: ({loginQuery, form, history, dispatch, updateAlert, updateForm}) => async (e) => {
      e.preventDefault();
      await updateAlert(alertInit);
      const data = await loginQuery({
        variables: {
          input: {
            email: form.email.value,
            password: form.password.value,
          },
        },
      });
      const user = get(data, 'data.login');
      if (user) {
        await dispatch(login(user));
        history.push('/users');
        return;
      }
      const typeError = get(data, 'errors[0].type');
      if (typeError === 'VALIDATE_ERROR') {
        const fields = get(data, 'errors[0].fields');
        const updateErrorForm = {
          email: {
            error: get(fields, 'email[0]'),
          },
          password: {
            error: get(fields, 'password[0]'),
          },
        };
        updateForm((prev) => merge(
          prev,
          updateErrorForm,
        ));
        return;
      }
      if (typeError === 'RES_MESSAGE') {
        const message = get(data, 'errors[0].message');
        updateAlert({
          color: 'error',
          message,
        });
        return;
      }
      updateAlert({
        color: 'red',
        message: 'Something was occur',
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      console.log(this.props.form);
    },
    componentWillUnmount() {
      console.log('unmount');
    },
  }),
);
