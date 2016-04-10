import { INCREMENT } from '../actions/counter';

var defaultState = 0;

export default function reduce(state = defaultState, action) {
    switch(action.type) {
        case INCREMENT:
            return state+1;
        default:
            return state;
    }
}