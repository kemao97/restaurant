import {gql} from 'apollo-boost';
import {graphql} from '@apollo/react-hoc';
import {compose, withHandlers} from 'recompose';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../../redux/actions/viewer';

const LOGOUT_QUERY = gql`
  mutation {
    logout
  }
`;

export default compose(
  withRouter,
  connect(),
  graphql(LOGOUT_QUERY, {name: 'logoutQuery'}),
  withHandlers({
    onLogout: ({logoutQuery, history, dispatch}) => async () => {
      await logoutQuery();
      await dispatch(logout());
      history.push('/login');
    },
  }),
);
