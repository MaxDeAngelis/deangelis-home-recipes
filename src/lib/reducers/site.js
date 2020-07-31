import produce from "immer"
import {SiteActionTypes} from '../actions';

export default produce((draft = {}, action) => {
    switch (action.type) {
        case SiteActionTypes.CLOSE_CONTENT:
            draft.nav.items = draft.nav.items.filter(item => (item.id !== action.id || item.category === "SITE"));
            draft.nav.items.forEach(item => {
                if (item.id === action.id) {
                    item.selected = false;
                } else if (item.id === "home") {
                    item.selected = true;
                }
            });
            break;
        case SiteActionTypes.OPEN_CONTENT:
            let alreadyOpen = false;
            draft.nav.items.forEach(item => {
                if (item.id === action.id) {
                    alreadyOpen = true;
                    item.selected = true;
                } else {
                    item.selected = false;
                }
            });
            if (!alreadyOpen) {
                draft.nav.items.push({
                    id : action.id,
                    category : action.category,
                    selected : true
                })
            }
            break;
        case SiteActionTypes.UPDATE_OPEN_NAV_ID:
            draft.nav.items.forEach(item => {
                if (item.selected) {
                    item.id = action.id;
                }
            });
            break;
        case SiteActionTypes.TOGGLE_SIDEBAR:
            draft.nav.open = !draft.nav.open;
            break;
        case SiteActionTypes.LOGIN:
            if (action.status === "success") {
                draft.loginOpen = false;
                draft.user = action.user;
            } else {
                draft.loginEerror = action.message;
            }
            break;
        case SiteActionTypes.LOGOUT:
            draft.loginOpen = false;
            draft.user = null;
            break;
        case SiteActionTypes.TOGGLE_LOGIN:
            draft.loginOpen = !draft.loginOpen;

            if (draft.loginOpen) {
                draft.loginEerror = "";
            }
            break;
    }
}, {});