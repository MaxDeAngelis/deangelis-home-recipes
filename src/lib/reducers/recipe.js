import {RecipeActionTypes} from '../actions';


export default function(state = {}, action) {
    switch (action.type) {
        case RecipeActionTypes.UPDATE_RECENTS:          
            return Object.assign({}, state, {
                recents : action.recents
            })
        default:
        return state
    }
}