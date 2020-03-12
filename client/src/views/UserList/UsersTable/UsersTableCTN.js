import {gql} from 'apollo-boost';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

const USERS_QUERY = gql`
  query users($options: UserPageOptions) {
    users(options: $options) {
      users {
        id
        email
        address
        phone
        createdAt
        updatedAt
      }
      meta {
        totalRecord
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const paginationInit = {
  offset: 1,
  limit: 5,
};

export default compose(
  withRouter,
  withState('pagination', 'updatePagination', paginationInit),
  graphql(USERS_QUERY, {
    name: 'usersQuery',
    options: ({pagination}) => ({
      variables: {
        options: {
          pagination: {
            offset: (pagination.offset - 1) * pagination.limit,
            limit: pagination.limit,
          },
        },
      },
    }),
  }),
  graphql(DELETE_USER, {name: 'deleteUserQuery'}),
  withProps(({usersQuery, pagination}) => {
    if (!usersQuery.loading && !usersQuery.error) {
      return {
        users: usersQuery.users.users,
        count: Math.ceil(usersQuery.users.meta.totalRecord / pagination.limit),
      };
    }
  }),
  withHandlers({
    changePaginate: ({updatePagination}) => (e, offset) => {
      updatePagination((prev) => ({
        ...prev,
        offset,
      }));
    },
    handleDelete: ({deleteUserQuery, usersQuery}) => (id) => async (e) => {
      await deleteUserQuery({
        variables: {id},
      });
      usersQuery.refetch();
    },
  }),
);
