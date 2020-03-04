import {gql} from 'apollo-boost';
import {compose, withHandlers, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';
import {withRouter} from 'react-router-dom';

const FOODS_QUERY = gql`
  query foods($options: FoodPageOptions) {
    foods(options: $options) {
      foods {
        id
        name
        description
        price
        createdAt
        updatedAt
      }
      meta {
        totalRecord
      }
    }
  }
`;

const DELETE_FOOD = gql`
  mutation deleteFood($id: ID!) {
    deleteFood(id: $id)
  }
`;

const paginationInit = {
  offset: 1,
  limit: 5,
};

export default compose(
  withRouter,
  withState('pagination', 'updatePagination', paginationInit),
  graphql(FOODS_QUERY, {
    name: 'foodsQuery',
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
  graphql(DELETE_FOOD, {name: 'deleteFoodQuery'}),
  withProps(({foodsQuery, pagination}) => {
    if (!foodsQuery.loading && !foodsQuery.error) {
      return {
        foods: foodsQuery.foods.foods,
        count: Math.ceil(foodsQuery.foods.meta.totalRecord / pagination.limit),
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
    handleDelete: ({deleteFoodQuery, foodsQuery}) => async (e, id) => {
      await deleteFoodQuery({
        variables: {id},
      });
      foodsQuery.refetch();
    },
  }),
);
