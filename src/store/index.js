import { combineReducers, createStore } from 'redux';

import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

const store = createStore(rootReducer);

export default store;
