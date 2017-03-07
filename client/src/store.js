import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './reducers/index';
import * as actions from './actions/index';

export default createStore(reducers.getModules, applyMiddleware(thunk));
