import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/reducer-index';
import * as actions from './actions/action-index';



export default createStore(
  rootReducer, 
  applyMiddleware(thunk, /*logger()*/)
);
