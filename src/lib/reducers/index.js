import { combineReducers } from 'redux'
import recipes from './recipe.js'
import site from './site.js';

export default combineReducers({
    recipe : recipes,
    site : site
})