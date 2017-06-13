import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { activeProjectId } from './activeProjectId'
import { modal } from './modal'
import { projects } from './projects';
import { timer } from './timer';

export default combineReducers({
    activeProjectId,
    modal,
    projects,
    timer,
    form: formReducer
});