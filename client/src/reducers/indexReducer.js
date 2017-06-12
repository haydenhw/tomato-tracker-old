import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { projects } from './projects';
import { modal } from './modal'
import { activeProjectId } from './activeProjectId'

export default combineReducers({
    activeProjectId,
    modal,
    projects,
    form: formReducer
});