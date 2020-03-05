import {branch, compose, lifecycle, withState} from 'recompose';
import {connect} from 'react-redux';

export default compose(
  connect(({viewer}) => ({isLogged: !!viewer.email})),
  branch(
    ({transparent}) => transparent,
    compose(
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
    ),
  ),
);
