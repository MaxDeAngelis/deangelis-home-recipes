import {SiteActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case SiteActionTypes.TOGGLE_SIDEBAR:
            return Object.assign({}, state, {
                showNav: !state.showNav
            })
        default:
        return state
    }
}