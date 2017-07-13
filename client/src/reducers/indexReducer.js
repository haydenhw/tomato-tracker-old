import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { customForm } from './customForm'
import { selectedProjectId } from './selectedProjectId'
import { modal } from './modal'
import { projects } from './projects';
import { timer } from './timer';

export default combineReducers({
    customForm,
    selectedProjectId,
    modal,
    projects,
    timer,
    form: formReducer
});