import Immutable from 'immutable';
import {RecipeActionTypes} from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case RecipeActionTypes.OPEN_RECIPE:
            let alreadyOpen = false;
            state.open.forEach((content) => {
                // If it is already open then reset data
                if (content.recipe.id == action.recipe.id) {
                    content.recipe = action.recipe;
                    content.selected = true;
                    alreadyOpen = true;
                } else {
                    content.selected = false;
                }
            })

            // If not found then push new
            if (!alreadyOpen) {
                state.open.push( {
                    selected : true,
                    recipe : action.recipe
                });
            }
            return Immutable.fromJS(state).toJS();
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