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
    UPDATE_RECENTS : "UPDATE_RECENTS"
}

export const RecipeActions = {
    getDataRecentFeed : function() {
        return function(dispatch) {
            // First dispatch: the app state is updated to inform
            // that the API call is starting.
        
            //dispatch(requestPosts(subreddit))
        
            // The function called by the thunk middleware can return a value,
            // that is passed on as the return value of the dispatch method.
        
            // In this case, we return a promise to wait for.
            // This is not required by thunk middleware, but it is convenient for us.

            //dispatch(RecipeActions.updateRecentPosts([{"id":"11","title":"Buttermilk and honey wheat bread","firstName":"Katie","lastName":"DeAngelis","servings":"12","cookTime":"0:25","prepTime":"0:10","category":"Lunch","season":"All","steps":"Put all ingredients in bread machine or in the order recommended by bread machine manufacturer.|Bake using whole wheat or regular bake cycle.","dateModified":"2017-11-11 17:47:55","picture":"images/recipes/recipe_11.png","creator":"31","public":true,"deleted":false,"ingredients":[{"ingredientId":"","ingredientName":"","quantity":"","units":""}]},{"id":"9","title":"Hummus and vegetable stuffed pita","firstName":"Katie","lastName":"DeAngelis","servings":"2","cookTime":"0:00","prepTime":"0:10","category":"Lunch","season":"All","steps":"Spread half of the hummus inside each pita half then fill with lettuce and vegetables and serve.","dateModified":"2017-11-11 12:58:01","picture":"images/recipes/recipe_9.png","creator":"31","public":true,"deleted":false,"ingredients":[{"ingredientId":"","ingredientName":"","quantity":"","units":""}]},{"id":"4","title":"Roasted monkfish and tomatoes","firstName":"Katie","lastName":"DeAngelis","servings":"4","cookTime":"0:12","prepTime":"0:15","category":"Dinner","season":"All","steps":"Preheat the oven to 450Â°F.|Line a baking sheet with parchment paper.|Arrange slices of fish and tomatoes alternately, overlapping them slightly, to form two long rows.|Season with salt and pepper, drizzle with oil and sprinkle with chile flakes.|Roast in the bottom third of the oven, without flipping, until fish is just cooked through and tomatoes are bubbly and caramelized, 10 to 12 minutes.","dateModified":"2017-11-11 12:41:58","picture":"images/recipes/recipe_4.png","creator":"31","public":true,"deleted":false,"ingredients":[{"ingredientId":"","ingredientName":"","quantity":"","units":""}]}]));

            return fetch('/processAction.php?action=GET_DATA_RECENT_FEED')
            .then(
                response => response.json(),
                // Do not use catch, because that will also catch
                // any errors in the dispatch and resulting render,
                // causing a loop of 'Unexpected batch number' errors.
                // https://github.com/facebook/react/issues/6895
                error => console.log('An error occurred.', error)
            )
            .then(function(json) {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(RecipeActions.updateRecentPosts(json))
            })
        }
    },
    updateRecentPosts : function(recipes) {
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