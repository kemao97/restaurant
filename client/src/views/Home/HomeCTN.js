import {gql} from 'apollo-boost';
import {branch, compose, lifecycle, withProps, withState} from 'recompose';
import {graphql} from '@apollo/react-hoc';
import {connect} from 'react-redux';

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
  connect(({viewer}) => ({isLogged: !!viewer.email})),
  graphql(FOOD_QUERY, {name: 'foodQuery'}),
  branch(
    ({foodQuery}) => !foodQuery.error && !foodQuery.loading,
    withProps(({foodQuery}) => ({foods: foodQuery.foods.foods})),
  ),
  withState('transparent', 'toggleNav', true),
  lifecycle({
    componentDidMount() {
      const {transparent, toggleNav} = this.props;
      window.addEventListener('scroll', function() {
        if (window.scrollY + 64 > window.innerHeight && transparent) {
          toggleNav(false);
        } else {
          toggleNav(true);
        }
      });
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', function() {});
    },
  }),
);
