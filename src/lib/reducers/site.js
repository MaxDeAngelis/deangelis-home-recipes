import Immutable from 'immutable';
import {SiteActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
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
        default:
            return state
    }
}