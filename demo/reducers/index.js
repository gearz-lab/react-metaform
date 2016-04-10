import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    routing,
    form: formReducer,
    counter
});

export default rootReducer;
