import {gql} from 'apollo-boost';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';

const USERS_QUERY = gql`
  query users($options: UserPageOptions) {
    users(options: $options) {
      users {
        id
        email
        createdAt
        updatedAt
      }
      meta {
        totalRecord
      }
    }
  }
`;

const paginationInit = {
  offset: 1,
  limit: 5,
};

export default compose(
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
  }),
);
