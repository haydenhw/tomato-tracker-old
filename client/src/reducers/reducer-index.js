import { combineReducers } from 'redux';
import { moduleList, projectList, boardSpecs } from './reducers';

export default combineReducers({
    moduleList,
    projectList,
    boardSpecs
});