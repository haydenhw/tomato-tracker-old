import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { testData } from './ajaxReducers';

export default combineReducers({
    testData,
    form: formReducer
});