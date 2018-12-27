import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';

import rootSaga from '../sagas';
import rootReducer from 'reducers/indexReducer';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
