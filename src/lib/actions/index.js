function _processAction(key, callback){
    fetch('/processAction.php?action=' + key)
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
    UPDATE_RECENTS : "UPDATE_RECENTS",
    UPDATE_SEARCH : "UPDATE_SEARCH"
}

export const RecipeActions = {
    search : function() {
        return function(dispatch) {
            _processAction("GET_LIST", function(json) {
                dispatch(RecipeActions.updateSearchResults(json))
            })
        }
    },
    getRecents : function() {
        return function(dispatch) {
            _processAction("GET_DATA_RECENT_FEED", function(json) {
                dispatch(RecipeActions.updateRecents(json))
            })
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
};


/*
axios.get('/processAction.php', {
    params: {
        action: action.type
    }
})
.then(function (response) {
    console.log(response);
    newState = {
        recentRecipes: response
    }
})
.catch(function (error) {
    console.log(error);
});

*/