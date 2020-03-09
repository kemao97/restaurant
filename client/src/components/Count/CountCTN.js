import {compose, withHandlers, withState} from 'recompose';

export default compose(
  withState('count', 'changeCount', ({count}) => count || 0),
  withHandlers({
    increase: ({cbChange, count, changeCount}) => async () => {
      cbChange(count + 1);
      changeCount((prev) => prev + 1);
    },
    minus: ({cbChange, count, changeCount}) => async () => {
      cbChange(count - 1);
      changeCount((prev) => prev - 1);
    },
    onChange: ({cbChange, changeCount}) => async (e) => {
      const value = parseInt(e.target.value) || 0;
      cbChange(value);
      changeCount(value);
    },
  }),
);
