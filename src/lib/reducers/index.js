import { combineReducers } from 'redux'
import recipes from './recipe.js'
import site from './site.js';


import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['auth']
}

const rootReducer = combineReducers({
    recipe : recipes,
    site : site
})

export default persistReducer(rootPersistConfig, rootReducer)