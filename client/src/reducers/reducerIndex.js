import { combineReducers } from 'redux';
import { moduleList } from './moduleReducers';
import { projectList, currentProjectInfo } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';

export default combineReducers({
    moduleList,
    projectList,
    currentProjectInfo,
    boardSpecs,
    anchorPositions
});