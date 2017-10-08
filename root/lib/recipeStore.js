import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import ActionTypes from './actionTypes.js';
import Dispatcher from './dispatcher.js';

class RecipeStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        var home = {
            id: "home",
            active: true,
            recentFeed: []
        };
        var newRecipe = {id: "new"};

        this._processAction({
            action : "GET_DATA_RECENT_FEED"
        }, 
        function(response) {
            home.recentFeed = response;
        }, false);

        return {
            open: [home, newRecipe]
        };
    }
    /**
     * Process a server call by calling server side processAction and passing action
     * @param {Object} action Object containing the action and any other data
     * @param {Function} callback Sucess callback for server call
     * @param {Boolean} async If the call should be asyc then pass true
     */
    _processAction(action, callback, async) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            // Success is 4
            if (xhr.readyState == 4) {
                var response = JSON.parse(this.responseText);
                if (typeof callback == "function") {
                    callback(response);
                }                
            }
        }

        xhr.open('POST', 'processAction.php', async);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(action));
    }

    _processContent(list, item) {
        var newItem = {
            id: item.id,
            active: true,
            recipe: item
        }

        var isOpen = false;
        for(var i = 0; i < list.length; i++) {
            list[i].active = false;
            if (list[i].id == item.id) {
                list[i] = newItem;
                isOpen = true;
            }
        }

        if (!isOpen) {
            list.push(newItem);
        }
    }

    _openContent(list, key) {
        for(var i = 0; i < list.length; i++) {
            list[i].active = false;
            if (list[i].id == key) {
                list[i].active = true;
            }
        }
    }

    _updateActiveRecipe(callback) {
        var recipe = {};
        var currState = this.getState();

        for(var i = 0; i < currState.open.length; i++) {
            if (currState.open[i].active) {
                currState.open[i].recipe = callback(currState.open[i].recipe);
                break;
            }
        }

        return currState;
    }

    reduce(state, action) {
        switch (action.action) {
            case ActionTypes.OPEN_CONTENT:
                this._openContent(state.open, action.key);
                return Immutable.fromJS(state).toJS(); 
            case ActionTypes.SERVER_REQUEST:
                this._processAction(action.data, action.callback, action.async);
                return state;
            case ActionTypes.SAVE_RECIPE:
                this._processAction(action, null, false);
                return state;
            case ActionTypes.GET_RECIPE:
                var store = this;
                //var newState = this.getState();
                var callback = function (response) {
                    store._processContent(state.open, response);
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
            case ActionTypes.NEW_RECIPE:
                var store = this;
                var callback = function (response) {
                    store._processContent(state.open, response);
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
            case ActionTypes.CLOSE_RECIPE:
                var index = null;
                var isActive = false;
                for (var i = 0; i < state.open.length; i++) {
                    if (state.open[i].id == action.id) {
                        index = i;
                        if (state.open[i].active) {
                            isActive = true;
                        }
                    }
                }

                if (isActive) {
                    for (var i = 0; i < state.open.length; i++) {
                        if (state.open[i].id == "home") {
                            state.open[i].active = true;
                        }
                    }
                }

                if (index != null) {
                    state.open.splice(index, 1);
                }
                
                return Immutable.fromJS(state).toJS();
            case ActionTypes.ADD_INGREDIENT:
                state = this._updateActiveRecipe(function(recipe) {
                    recipe.ingredients.push({
                        id: "",
                        unit: "",
                        ingredientName: ""
                    });  
                    return recipe;
                });

                return Immutable.fromJS(state).toJS();
            case ActionTypes.ADD_STEP:
                state = this._updateActiveRecipe(function(recipe) {
                    recipe.steps += "|";
                    return recipe;
                });

                return Immutable.fromJS(state).toJS();
            case ActionTypes.UPDATE_VALUE:
                //console.log("Update: " + action.key + " with " + action.value);
                state = this._updateActiveRecipe(function(recipe) {
                    recipe[action.key] = action.value;
                    return recipe;
                });

                return Immutable.fromJS(state).toJS();
            default:
                console.log("default");
                return state;
        }
    }
}

export default new RecipeStore();