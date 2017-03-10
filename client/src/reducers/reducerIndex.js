import { combineReducers } from 'redux';
import { moduleList, currentProjectModules } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';

export default combineReducers({
    moduleList,
    projectList,
    currentProjectInfo,
    currentProjectModules,
    boardSpecs,
    anchorPositions
});