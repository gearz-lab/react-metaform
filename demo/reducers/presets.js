import { LOAD_PRESETS } from '../actions/presets.js';

var defaultState = [];

export default function reduce(state = defaultState, action) {
    switch(action.type) {
        case LOAD_PRESETS:
            return action.presets;
        default:
            return state;
    }
}