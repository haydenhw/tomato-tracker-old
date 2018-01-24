import { keymap } from '../helpers/customImmutable';
import { moveCardsKeyboard } from '../actions/projectActions';

export const handleKeyDown = (evt) => {
  return (dispatch, getState) => {

    const evtobj = window.event ? event : evt;
    const keycode = evtobj.keyCode;

    const key = keymap[keycode];

    switch(key) {
      case 'ARROW_UP':
      case 'ARROW_DOWN':
        // dispatch(moveCardsKeyboard(key, evt));
      break;
      case 'G':
        if (evtobj.ctrlKey) {
          evtobj.preventDefault();
          dispatch({
            type: 'TOGGLE_CONFIG',
          });
        }
      break;
    }
  }
}
