import viewerReducer from './reducers/viewer';
import storage from 'redux-persist/lib/storage';
import reduxReset from 'redux-reset';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {createStore} from 'redux';

const config = {
  key: 'root',
  storage,
};

const store = createStore(
  persistCombineReducers(config, {
    viewer: viewerReducer,
  }),
  reduxReset(),
);

const persist = persistStore(store);

export {store, persist};
