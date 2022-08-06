/* eslint-disable no-use-before-define */
import md5 from 'md5';

function processAction(method, key, params, callback) {
  let url = '/processAction.php';
  const options = {
    method,
  };

  if (method === 'GET') {
    url += `?action=${key}`;
    Object.keys(params).forEach((paramKey) => {
      url += `&${paramKey}=${params[paramKey]}`;
    });
  } else if (method === 'POST') {
    params.action = key;
    options.body = JSON.stringify(params);
  }

  fetch(url, options)
    .then(
      (response) => response.json(),
      // eslint-disable-next-line no-console
      (error) => console.log('An error occurred.', error)
    )
    .then(callback);
}

export const RecipeActionTypes = {
  UPDATE_VALUE: 'UPDATE_VALUE',
  CLOSE_RECIPE: 'CLOSE_RECIPE',
  OPEN_RECIPE: 'OPEN_RECIPE',
  UPDATE_RECENTS: 'UPDATE_RECENTS',
  UPDATE_SEARCH: 'UPDATE_SEARCH',
  SAVE_RECIPE: 'SAVE_RECIPE',
  GET_INGREDIENTS: 'GET_INGREDIENTS',
  GET_UNITS: 'GET_UNITS',
};

const PrivateRecipeActions = {
  close(id) {
    return {
      type: RecipeActionTypes.CLOSE_RECIPE,
      id,
    };
  },
  openRecipe(recipe) {
    return {
      type: RecipeActionTypes.OPEN_RECIPE,
      recipe,
    };
  },
  saveRecipe(title, recipeId, picture) {
    return {
      type: RecipeActionTypes.SAVE_RECIPE,
      title,
      recipeId,
      picture,
    };
  },
  updateSearchResults(recipes, searchText) {
    return {
      type: RecipeActionTypes.UPDATE_SEARCH,
      results: recipes,
      searchText,
    };
  },
  updateRecents(recipes) {
    return {
      type: RecipeActionTypes.UPDATE_RECENTS,
      recents: recipes,
    };
  },
  getIngredients(results) {
    return {
      type: RecipeActionTypes.GET_INGREDIENTS,
      results,
    };
  },
  getUnits(results) {
    return {
      type: RecipeActionTypes.GET_UNITS,
      results,
    };
  },
};

export const RecipeActions = {
  save(recipe) {
    return (dispatch) => {
      processAction('POST', 'SAVE_RECIPE', { recipe }, (json) => {
        if (json.status === 'success') {
          dispatch(
            PrivateRecipeActions.saveRecipe(
              json.title,
              json.recipeId,
              json.picture
            )
          );
          dispatch(PrivateSiteActions.updateOpenNav(json.recipeId));
        } else {
          // eslint-disable-next-line no-console
          console.log('Failed to Save Recipe', json);
        }
      });
    };
  },
  new() {
    return (dispatch) => {
      processAction('GET', 'NEW_RECIPE', {}, (json) => {
        dispatch(PrivateRecipeActions.openRecipe(json));
        dispatch(SiteActions.openContent(json.id, 'RECIPE'));
      });
      processAction('GET', 'GET_DATA_INGREDIENTS', {}, (json) => {
        dispatch(PrivateRecipeActions.getIngredients(json));
      });
      processAction('GET', 'GET_DATA_UNITS', {}, (json) => {
        dispatch(PrivateRecipeActions.getUnits(json));
      });
    };
  },
  close(id) {
    return (dispatch) => {
      dispatch(PrivateRecipeActions.close(id));
      dispatch(SiteActions.closeContent(id));
    };
  },
  open(id) {
    return (dispatch) => {
      processAction('GET', 'GET_RECIPE', { id }, (json) => {
        dispatch(PrivateRecipeActions.openRecipe(json));
        dispatch(SiteActions.openContent(json.id, 'RECIPE'));
      });
      processAction('GET', 'GET_DATA_INGREDIENTS', {}, (json) => {
        dispatch(PrivateRecipeActions.getIngredients(json));
      });
      processAction('GET', 'GET_DATA_UNITS', {}, (json) => {
        dispatch(PrivateRecipeActions.getUnits(json));
      });
    };
  },
  updateValue(id, key, value) {
    return {
      type: RecipeActionTypes.UPDATE_VALUE,
      id,
      key,
      value,
    };
  },
  search(text) {
    return (dispatch) => {
      processAction('GET', 'SEARCH', { searchText: text }, (json) => {
        dispatch(PrivateRecipeActions.updateSearchResults(json, text));
      });
    };
  },
  getRecents() {
    return (dispatch) => {
      processAction('GET', 'GET_DATA_RECENT_FEED', {}, (json) => {
        dispatch(PrivateRecipeActions.updateRecents(json));
      });
    };
  },
};

export const SiteActionTypes = {
  OPEN_CONTENT: 'OPEN_CONTENT',
  CLOSE_CONTENT: 'CLOSE_CONTENT',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_LOGIN: 'TOGGLE_LOGIN',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  UPDATE_OPEN_NAV_ID: 'UPDATE_OPEN_NAV_ID',
};

const PrivateSiteActions = {
  login(status, user, message) {
    return {
      type: SiteActionTypes.LOGIN,
      status,
      user,
      message,
    };
  },
  logout() {
    return {
      type: SiteActionTypes.LOGOUT,
    };
  },
  updateOpenNav(id) {
    return {
      type: SiteActionTypes.UPDATE_OPEN_NAV_ID,
      id,
    };
  },
};

export const SiteActions = {
  login(username, password) {
    return (dispatch) => {
      processAction(
        'GET',
        'LOGIN',
        { username, password: md5(password) },
        (json) => {
          dispatch(
            PrivateSiteActions.login(json.status, json.user, json.message)
          );
          dispatch(RecipeActions.getRecents());
        }
      );
    };
  },
  logout() {
    return (dispatch) => {
      processAction('GET', 'LOGOUT', {}, () => {
        dispatch(PrivateSiteActions.logout());
        dispatch(RecipeActions.getRecents());
      });
    };
  },
  toggleLogin() {
    return {
      type: SiteActionTypes.TOGGLE_LOGIN,
    };
  },
  openContent(id, category) {
    return {
      type: SiteActionTypes.OPEN_CONTENT,
      id,
      category,
    };
  },
  closeContent(id) {
    return {
      type: SiteActionTypes.CLOSE_CONTENT,
      id,
    };
  },
  toggleSidebar() {
    return {
      type: SiteActionTypes.TOGGLE_SIDEBAR,
    };
  },
};
