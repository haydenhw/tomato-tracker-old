const keymap = {
  17: 'CONTROL',
  27: 'ESCAPE',
  38: 'ARROW_UP',
  40: 'ARROW_DOWN',
  68: 'D',
  78: 'N',
  88: 'X',
  71: 'G',
}

export const UPDATE_CONFIG = "UPDATE_CONFIG";
export function updateConfig(newConfigData) {
  return {
    type: "UPDATE_CONFIG",
    newConfigData
  }
}

export const DELETE_SELECTED = 'DELETE_SELECTED';
export const handleKeyDown = (evt) => {
  return (dispatch, getState) => {

    evt.preventDefault();
    // evt.stopPropagation();
    const evtobj = window.event? event : evt;
    const keycode = evtobj.keyCode;

    // const key = evtobj.ctrlKey && keycode === 88
    // ? 'CTRL+X'
    // : keymap[keycode];
    const key = keymap[keycode];
    console.log(keycode)
    switch(key) {
      case 'G':
        if (evtobj.ctrlKey) {
          dispatch({
            type: 'TOGGLE_CONFIG',
          });
        }
      break;
    }
  }
}
