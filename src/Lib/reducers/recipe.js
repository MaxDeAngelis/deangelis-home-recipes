import produce from 'immer';
import { RecipeActionTypes } from '../actions';

export default produce((draft = {}, action) => {
  switch (action.type) {
    case RecipeActionTypes.UPDATE_VALUE: {
      draft.open.forEach((content) => {
        if (content.id === action.id) {
          content[action.key] = action.value;
        }
      });
      break;
    }
    case RecipeActionTypes.CLOSE_RECIPE: {
      draft.open = draft.open.filter((recipe) => recipe.id !== action.id);
      break;
    }
    case RecipeActionTypes.OPEN_RECIPE: {
      let alreadyOpen = false;
      draft.open.forEach((content) => {
        // If it is already open then reset data
        if (content.id === action.recipe.id) {
          content = action.recipe;
          alreadyOpen = true;
        }
      });

      // If not found then push new
      if (!alreadyOpen) {
        draft.open.push(action.recipe);
      }
      break;
    }
    case RecipeActionTypes.SAVE_RECIPE: {
      draft.open.forEach((content) => {
        // If it is already open then reset data
        if (content.title === action.title) {
          content.edit = false;
          content.id = action.recipeId;
          content.picture = action.picture;
        }
      });
      break;
    }
    case RecipeActionTypes.UPDATE_RECENTS: {
      draft.recents = action.recents;
      break;
    }
    case RecipeActionTypes.UPDATE_SEARCH: {
      draft.searchResults = action.results || [];
      break;
    }
    case RecipeActionTypes.GET_INGREDIENTS: {
      draft.ingredients = action.results || [];
      break;
    }
    case RecipeActionTypes.GET_UNITS: {
      draft.units = action.results || [];
      break;
    }
    default: {
      return draft;
    }
  }
  return draft;
}, {});
