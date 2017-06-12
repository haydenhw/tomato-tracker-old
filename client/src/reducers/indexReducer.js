import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { projects } from './projects';
import { modal } from './modal'

export default combineReducers({
    modal,
    projects,
    form: formReducer
});