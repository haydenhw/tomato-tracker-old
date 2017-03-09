import { combineReducers } from 'redux';
import { moduleList } from './moduleReducers';
import { projectList } from './projectReducers';
import { boardSpecs, anchorPositions } from './boardReducers';
   

export default combineReducers({
    moduleList,
    projectList,
    boardSpecs,
    anchorPositions
});