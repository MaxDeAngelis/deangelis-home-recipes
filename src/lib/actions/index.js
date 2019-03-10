import md5 from 'md5';

function _processAction(key, params, callback){
    let url = '/api/processAction.php?action=' + key
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
        OPEN_CONTENT : "OPEN_CONTENT",
        CLOSE_CONTENT : "CLOSE_CONTENT",
        TOGGLE_SIDEBAR : "TOGGLE_SIDEBAR",
        TOGGLE_LOGIN : "TOGGLE_LOGIN",
        LOGIN : "LOGIN",
        LOGOUT : "LOGOUT"
}

export const SiteActions = {
    login : function(username, password) {
        return function(dispatch) {
            _processAction("LOGIN", {username : username, password : md5(password)}, function(json) {
                dispatch(PrivateSiteActions.login(json.status, json.user, json.message));
                dispatch(RecipeActions.getRecents());
            })
        }
    },
    logout : function() {
        return function(dispatch) {
            _processAction("LOGOUT", {}, function(json) {
                dispatch(PrivateSiteActions.logout());
                dispatch(RecipeActions.getRecents());
            })
        }
    },
    toggleLogin : function() {
        return { 
            type : SiteActionTypes.TOGGLE_LOGIN
        }
    },
    openContent : function(id, category) {
        return { 
            type : SiteActionTypes.OPEN_CONTENT,
            id : id,
            category : category
        }
    },
    closeContent : function(id) {
        return { 
            type : SiteActionTypes.CLOSE_CONTENT,
            id : id
        }
    },
    toggleSidebar : function() {
        return { 
            type: SiteActionTypes.TOGGLE_SIDEBAR
        }
    }
};


const PrivateSiteActions = {
    login : function(status, user, message) {
        return {
            type : SiteActionTypes.LOGIN,
            status : status,
            user: user,
            message: message
        }
    },
    logout : function() {
        return {
            type : SiteActionTypes.LOGOUT
        }
    }
}

export const RecipeActionTypes = {
    UPDATE_VALUE : "UPDATE_VALUE",
    CLOSE_RECIPE : "CLOSE_RECIPE",
    OPEN_RECIPE : "OPEN_RECIPE",
    UPDATE_RECENTS : "UPDATE_RECENTS",
    UPDATE_SEARCH : "UPDATE_SEARCH",
    GET_INGREDIENTS : "GET_INGREDIENTS",
    GET_UNITS: "GET_UNITS"
}

export const RecipeActions = {
    new: function() {
        return function(dispatch) {
            _processAction("NEW_RECIPE", {}, function(json) {
                dispatch(PrivateRecipeActions.openRecipe(json))
                dispatch(SiteActions.openContent(json.id, "RECIPE"));
            })
        }
    },
    close : function(id) {
        return function(dispatch) {
            dispatch(PrivateRecipeActions.close(id))
            dispatch(SiteActions.closeContent(id));
        }
    },
    open : function(id) {
        return function(dispatch) {
            _processAction("GET_RECIPE", {id : id}, function(json) {
                dispatch(PrivateRecipeActions.openRecipe(json))
                dispatch(SiteActions.openContent(json.id, "RECIPE"));
            })
            _processAction("GET_DATA_INGREDIENTS", {}, function(json) {
                dispatch(PrivateRecipeActions.getIngredients(json))
            })
            _processAction("GET_DATA_UNITS", {}, function(json) {
                dispatch(PrivateRecipeActions.getUnits(json))
            })
        }
    },
    updateValue : function(id, key, value) {
        return {
            type : RecipeActionTypes.UPDATE_VALUE,
            id : id,
            key : key,
            value : value
        }
    },
    search : function(text) {
        return function(dispatch) {
            _processAction("SEARCH", { searchText : text}, function(json) {
                dispatch(PrivateRecipeActions.updateSearchResults(json));
            })
        }
    },
    getRecents : function() {
        return function(dispatch) {
            _processAction("GET_DATA_RECENT_FEED", {}, function(json) {
                dispatch(PrivateRecipeActions.updateRecents(json));
            })
        }
    }, 
};

const PrivateRecipeActions = {
    close : function(id) {
        return {
            type : RecipeActionTypes.CLOSE_RECIPE,
            id : id
        }
    },
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
    },
    getIngredients : function(results) {
        return { 
            type: RecipeActionTypes.GET_INGREDIENTS,
            results : results
        }
    },
    getUnits : function(results) {
        return { 
            type: RecipeActionTypes.GET_UNITS,
            results : results
        }
    },
}