/* eslint-disable no-undef */
import { combineReducers } from 'redux';
import reducers from 'store/modules';

const rootReducer = combineReducers({
  ...reducers
});
export default rootReducer;
