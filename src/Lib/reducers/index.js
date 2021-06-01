import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import recipes from './recipe';
import site from './site';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const rootReducer = combineReducers({
  recipe: recipes,
  site,
});

export default persistReducer(rootPersistConfig, rootReducer);
