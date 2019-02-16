import md5 from 'md5';

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
        OPEN_CONTENT : "OPEN_CONTENT",
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
    OPEN_RECIPE : "OPEN_RECIPE",
    UPDATE_RECENTS : "UPDATE_RECENTS",
    UPDATE_SEARCH : "UPDATE_SEARCH"
}

export const RecipeActions = {
    open : function(id) {
        return function(dispatch) {
            _processAction("GET_RECIPE", {id : id}, function(json) {
                dispatch(PrivateRecipeActions.openRecipe(json))
                dispatch(SiteActions.openContent(json.id, "RECIPE"));
            })
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