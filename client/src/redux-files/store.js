import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/indexReducer';
import * as actions from '../actions/indexActions';

const uiSounds = store => next => action => {
  const audio = new Audio('sound/click.mp3');
  audio.volume = 0.3;

  switch (action.type) {
    case actions.START_TIMER:
    case actions.STOP_TIMER:
      audio.play();
      break;
    case actions.SET_SELECTED_TASK_ID:
      if (action.playSound) {
        const playPromise = audio.play();

        if (playPromise) {
          playPromise.catch(error => {
            console.log(error);
          });
        }
      }
      break;
    default:
      break;
  }

  return next(action);
};


export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, uiSounds),
);

