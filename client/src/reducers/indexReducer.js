import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { customForm } from './customForm';
import { clickedTaskId } from './clickedTaskId';
import { config } from './config';
import { editMenu } from './editMenu';
import { log } from './log';
// import { entities } from './entities';
import { modal } from './modal';
// import { nav } from './nav';
import { projects } from './projects';
import { selectedProjectId } from './selectedProjectId';
import { timer } from './timer';

export default combineReducers({
    clickedTaskId,
    config,
    customForm,
    editMenu,
    // entities,
    log,
    modal,
    // nav, not currently in use!
    projects,
    selectedProjectId,
    timer,
    form: formReducer
});
