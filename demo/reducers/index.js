import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import counter from './counter';
import presets from './presets';

const rootReducer = combineReducers({
    routing,
    form: formReducer,
    counter,
    presets
});

export default rootReducer;
