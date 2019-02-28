import Immutable from 'immutable';
import {RecipeActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case RecipeActionTypes.UPDATE_VALUE:
            state.open.forEach((content) => {
                if (content.id === action.id) {
                    content[action.key] = action.value;
                }
            })
            return Immutable.fromJS(state).toJS();
        case RecipeActionTypes.CLOSE_RECIPE:
            state.open = state.open.filter(recipe => recipe.id !== action.id);
            return Immutable.fromJS(state).toJS();
        case RecipeActionTypes.OPEN_RECIPE:
            let alreadyOpen = false;
            state.open.forEach((content) => {
                // If it is already open then reset data
                if (content.id === action.recipe.id) {
                    content = action.recipe;
                    alreadyOpen = true;
                }
            })

            // If not found then push new
            if (!alreadyOpen) {
                state.open.push(action.recipe);
            }
            return Immutable.fromJS(state).toJS();
        case RecipeActionTypes.UPDATE_RECENTS:  
            state.recents = action.recents;
            return Immutable.fromJS(state).toJS();
        case RecipeActionTypes.UPDATE_SEARCH:
            state.searchResults = action.results || [];
            return Immutable.fromJS(state).toJS();
        default:
            return state
    }
}