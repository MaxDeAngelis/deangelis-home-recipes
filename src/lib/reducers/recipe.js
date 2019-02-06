import Immutable from 'immutable';
import {RecipeActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case RecipeActionTypes.UPDATE_RECENTS:  
            state.recents = action.recents;
            return Immutable.fromJS(state).toJS();
        case RecipeActionTypes.UPDATE_SEARCH:
            state.searchResults = action.results;
            return Immutable.fromJS(state).toJS();
        default:
            return state
    }
}