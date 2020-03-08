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

const profileInit = {
  email: '',
  address: '',
  phone: '',
};

export default compose(
  withState('profile', 'updateProfile', profileInit),
  graphql(UPDATE_PROFILE, {name: 'updateUserQuery'}),
  graphql(VIEWER_QUERY, {name: 'viewerQuery'}),
  branch(
    ({viewerQuery}) => viewerQuery.viewer,
    withProps(({viewerQuery}) => ({viewer: viewerQuery.viewer})),
  ),
  withHandlers({
    handleChange: ({updateProfile}) => async (e) => {
      const {name, value} = e.target;
      updateProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    handleSubmit: ({profile, updateProfile, updateUserQuery}) => async (e) => {
      e.preventDefault();
      updateProfile((prev) => ({
        ...prev,
        errors: undefined,
      }));
      const profileUpdate = await updateUserQuery({
        variables: {
          input: {
            address: profile.address,
            phone: profile.phone,
          },
        },
      });
      if (profileUpdate.errors) {
        await profileUpdate.handleFormErrors({updateForm: updateProfile});
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const {updateProfile, viewer} = this.props;
      viewer && updateProfile(viewer);
    },
  }),
);
