import Immutable from 'immutable';
import {SiteActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case SiteActionTypes.TOGGLE_SIDEBAR:
            state.nav.open = !state.nav.open;
            return Immutable.fromJS(state).toJS();
        default:
            return state
    }
}