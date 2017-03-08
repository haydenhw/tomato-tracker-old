import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './reducers/reducer-index';
import * as actions from './actions/action-index';



export default createStore(
  reducers.boardDimensions, 
  applyMiddleware(thunk, logger())
);
