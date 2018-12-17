import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { customForm } from './customForm';
import { clickedTaskId } from './clickedTaskId';
import { config } from './config';
import { editMenu } from './editMenu';
import { log } from './log';
import { modal } from './modal';
import { projects } from './projects';
import { selectedProjectId } from './selectedProjectId';
import { selectedTaskId } from './selectedTaskId';
import { timer } from './timer';

export default combineReducers({
    clickedTaskId,
    config,
    customForm,
    editMenu,
    log,
    modal,
    projects,
    selectedProjectId,
    selectedTaskId,
    timer,
    form: formReducer
});
