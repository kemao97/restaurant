import {LOGIN, LOGOUT} from '../actions/viewer';

const viewerDefaultState = {
  id: undefined,
  email: undefined,
};

const viewerReducer = (state = viewerDefaultState, action) => {
  const {type, id, email} = action;
  switch (type) {
    case LOGIN:
      return {
        id,
        email,
      };
    case LOGOUT:
      return viewerDefaultState;
    default:
      return state;
  }
};

export default viewerReducer;
