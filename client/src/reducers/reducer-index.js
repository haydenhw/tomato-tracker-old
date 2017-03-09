import { combineReducers } from 'redux';
import { moduleList, projectList, boardSpecs, anchorPositions } from './reducers';

export default combineReducers({
    moduleList,
    projectList,
    boardSpecs,
    anchorPositions
});