import Immutable from 'immutable';
import {SiteActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case SiteActionTypes.CLOSE_CONTENT:
            state.nav.items = state.nav.items.filter(item => (item.id !== action.id));
            return Immutable.fromJS(state).toJS();
        case SiteActionTypes.OPEN_CONTENT:
            let alreadyOpen = false;
            state.nav.items.forEach(item => {
                if (item.id === action.id) {
                    alreadyOpen = true;
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
            if (!alreadyOpen) {
                state.nav.items.push({
                    id : action.id,
                    category : action.category,
                    selected : true
                })
            }
            return Immutable.fromJS(state).toJS();
        case SiteActionTypes.TOGGLE_SIDEBAR:
            state.nav.open = !state.nav.open;
            return Immutable.fromJS(state).toJS();
        case SiteActionTypes.LOGIN:
            if (action.status === "success") {
                state.loginOpen = false;
                state.user = action.user;
            } else {
                state.loginEerror = action.message;
            }
            return Immutable.fromJS(state).toJS();
        case SiteActionTypes.LOGOUT:
            state.loginOpen = false;
            state.user = null;
            return Immutable.fromJS(state).toJS();
        case SiteActionTypes.TOGGLE_LOGIN:
            state.loginOpen = !state.loginOpen;
            return Immutable.fromJS(state).toJS();
        default:
            return state
    }
}