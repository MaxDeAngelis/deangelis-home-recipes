function _processAction(key, params, callback){
    let url = '/processAction.php?action=' + key
    for (var paramKey in params) {
        url += "&" + paramKey + "=" + params[paramKey];
    }
    fetch(url)
    .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
    )
    .then(callback)
}

export const SiteActionTypes = {
        TOGGLE_SIDEBAR : "TOGGLE_SIDEBAR"
}

export const SiteActions = {
    toggleSidebar : function() {
        return { 
            type: SiteActionTypes.TOGGLE_SIDEBAR
        }
    }
};

export const RecipeActionTypes = {
    OPEN_RECIPE : "OPEN_RECIPE",
    UPDATE_RECENTS : "UPDATE_RECENTS",
    UPDATE_SEARCH : "UPDATE_SEARCH"
}

export const RecipeActions = {
    open : function(id) {
        return function(dispatch) {
            _processAction("GET_RECIPE", {id : id}, function(json) {
                dispatch(PrivateRecipeActions.openRecipe(json))
            })
        }
    },
    search : function() {
        return function(dispatch) {
            _processAction("GET_LIST", {}, function(json) {
                dispatch(PrivateRecipeActions.updateSearchResults(json))
            })
        }
    },
    getRecents : function() {
        return function(dispatch) {
            _processAction("GET_DATA_RECENT_FEED", {}, function(json) {
                dispatch(PrivateRecipeActions.updateRecents(json))
            })
        }
    }, 
};

const PrivateRecipeActions = {
    openRecipe : function(recipe) {
        return {
            type : RecipeActionTypes.OPEN_RECIPE,
            recipe : recipe
        }
    },
    updateSearchResults : function(recipes) {
        return {
            type : RecipeActionTypes.UPDATE_SEARCH,
            results : recipes
        }
    },
    updateRecents : function(recipes) {
        return { 
            type: RecipeActionTypes.UPDATE_RECENTS,
            recents : recipes
        }
    }
}