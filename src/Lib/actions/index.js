import md5 from 'md5';

function _processAction(method, key, params, callback){
    let url = '/processAction.php'
    let options = {
        method: method
    };

    if (method === "GET") {
        url += '?action=' + key
        for (var paramKey in params) {
            url += "&" + paramKey + "=" + params[paramKey];
        }
    } else if (method === "POST") {
        params.action = key;
        options.body = JSON.stringify(params);
    }

    fetch(url, options)
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
        LOGOUT : "LOGOUT",
        UPDATE_OPEN_NAV_ID : "UPDATE_OPEN_NAV_ID"
}

export const SiteActions = {
    login : function(username, password) {
        return function(dispatch) {
            _processAction("GET", "LOGIN", {username : username, password : md5(password)}, function(json) {
                dispatch(PrivateSiteActions.login(json.status, json.user, json.message));
                dispatch(RecipeActions.getRecents());
            })
        }
    },
    logout : function() {
        return function(dispatch) {
            _processAction("GET", "LOGOUT", {}, function(json) {
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
    },
    updateOpenNav : function(id) {
        return {
            type : SiteActionTypes.UPDATE_OPEN_NAV_ID,
            id : id
        }
    },
}

export const RecipeActionTypes = {
    UPDATE_VALUE : "UPDATE_VALUE",
    CLOSE_RECIPE : "CLOSE_RECIPE",
    OPEN_RECIPE : "OPEN_RECIPE",
    UPDATE_RECENTS : "UPDATE_RECENTS",
    UPDATE_SEARCH : "UPDATE_SEARCH",
    SAVE_RECIPE : "SAVE_RECIPE",
    GET_INGREDIENTS : "GET_INGREDIENTS",
    GET_UNITS: "GET_UNITS"
}

export const RecipeActions = {
    save: function(recipe) {
        return function(dispatch) {
            _processAction("POST", "SAVE_RECIPE", {recipe: recipe}, function(json) {
                if (json.status == "success") {
                    dispatch(PrivateRecipeActions.saveRecipe(json.title, json.recipeId, json.picture));
                    dispatch(PrivateSiteActions.updateOpenNav(json.recipeId));
                } else {
                    console.log("Failed to Save Recipe", json);
                }
            })
        }
    },
    new: function() {
        return function(dispatch) {
            _processAction("GET", "NEW_RECIPE", {}, function(json) {
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
            _processAction("GET", "GET_RECIPE", {id : id}, function(json) {
                dispatch(PrivateRecipeActions.openRecipe(json))
                dispatch(SiteActions.openContent(json.id, "RECIPE"));
            })
            _processAction("GET", "GET_DATA_INGREDIENTS", {}, function(json) {
                dispatch(PrivateRecipeActions.getIngredients(json))
            })
            _processAction("GET", "GET_DATA_UNITS", {}, function(json) {
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
            _processAction("GET", "SEARCH", { searchText : text}, function(json) {
                dispatch(PrivateRecipeActions.updateSearchResults(json));
            })
        }
    },
    getRecents : function() {
        return function(dispatch) {
            _processAction("GET", "GET_DATA_RECENT_FEED", {}, function(json) {
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
    saveRecipe : function(title, recipeId, picture) {
        return {
            type : RecipeActionTypes.SAVE_RECIPE,
            title : title,
            recipeId : recipeId,
            picture : picture
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