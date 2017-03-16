import { combineReducers } from 'redux';
import {currentProjectModules, moduleBank , draggingModule } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
import { mouseEvents } from './mouseEventReducers';

export default combineReducers({
    projectList,
    currentProjectInfo,
    currentProjectModules,
    moduleBank,
    draggingModule,
    boardSpecs,
    anchorPositions,
    mouseEvents
});