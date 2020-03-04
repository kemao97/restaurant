import {gql} from 'apollo-boost';
import {branch, compose, lifecycle, withHandlers, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';

const VIEWER_QUERY = gql`
  query viewer {
    viewer {
      id
      email
      phone
      address
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateProfile(input: $input) {
      id
      email
      address
      phone
    }
  }
`;

export default compose(
  graphql(UPDATE_PROFILE, {name: 'updateUserQuery'}),
  graphql(VIEWER_QUERY, {name: 'viewerQuery'}),
  branch(
    ({viewerQuery}) => viewerQuery.viewer,
    withProps(({viewerQuery}) => ({viewer: viewerQuery.viewer})),
  ),
  withState('profile', 'updateProfile', {}),
  withHandlers({
    handleChange: ({updateProfile}) => async (e) => {
      const {name, value} = e.target;
      updateProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    handleSubmit: ({profile, updateUserQuery}) => async (e) => {
      e.preventDefault();
      await updateUserQuery({
        variables: {
          input: {
            address: profile.address,
            phone: profile.phone,
          },
        },
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const {updateProfile, viewer} = this.props;
      viewer && updateProfile(viewer);
    },
  }),
);
