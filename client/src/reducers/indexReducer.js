import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { selectedProjectId } from './selectedProjectId'
import { modal } from './modal'
import { projects } from './projects';
import { timer } from './timer';

export default combineReducers({
    selectedProjectId,
    modal,
    projects,
    timer,
    form: formReducer
});