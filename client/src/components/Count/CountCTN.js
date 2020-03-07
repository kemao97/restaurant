import {compose, withHandlers, withState} from 'recompose';

export default compose(
  withState('count', 'changeCount', ({count}) => count || 0),
  withHandlers({
    increase: ({changeCount}) => () => changeCount((prev) => prev + 1),
    minus: ({changeCount}) => () => changeCount((prev) => prev - 1),
    onChange: ({changeCount}) => async (e) => {
      const value = parseInt(e.target.value) || 0;
      changeCount(value);
    },
  }),
);
