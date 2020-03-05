import {gql} from 'apollo-boost';
import {branch, compose, withProps} from 'recompose';
import {graphql} from '@apollo/react-hoc';

const FOOD_QUERY = gql`
  query ($option: FoodPageOptions) {
    foods(options: $option) {
      foods {
        id
        name
        description
        price
        foodAttachments {
          path
        }
      }
    }
  }
`;

export default compose(
  graphql(FOOD_QUERY, {name: 'foodQuery'}),
  branch(
    ({foodQuery}) => !foodQuery.error && !foodQuery.loading,
    withProps(({foodQuery}) => ({foods: foodQuery.foods.foods})),
  ),
);
