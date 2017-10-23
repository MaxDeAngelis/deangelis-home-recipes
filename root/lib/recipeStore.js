import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import ActionTypes from './actionTypes.js';
import Dispatcher from './dispatcher.js';
import MD5 from 'js-md5';

class RecipeStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        var newRecipe = {id: "new"};
        var userSettings = { id: "user", active: false };
        var notify = { active: false, timer: null, message: "", type: "" };

        // Get home feed on initial load
        var home = { id: "home", active: true, recentFeed: [] };
        this._processAction(
            { action : "GET_DATA_RECENT_FEED" }, 
            function(response) {
                if (response != null) {
                    home.recentFeed = response;
                }
            }, false
        );

        // See if the user is already logged in
        var user = null;
        this._processAction(
            { action : "LOGIN" }, 
            function(response) {
                if (response != null && response.status == "success") {
                    user = response.user;
                }
            }, false
        );
        
        var authenticate = { active: false, type: "login" };
        if (location.hash && location.hash.indexOf("key") != -1 && location.hash.indexOf("id") != -1&& location.hash.indexOf("name") != -1) {
            authenticate.active = true;
            authenticate.type = "reset";

            // Trim off the first charecter and split on values
            var pairs = location.hash.slice(1).split("&");
            for (var i = 0; i < pairs.length; i++) {
                var key = pairs[i].split("=")[0];
                var value = pairs[i].split("=")[1];
                if (key == "name") {
                    authenticate.user = value;
                } else if (key == "id") {
                    authenticate.userId = value;
                } else if (key == "key") {
                    authenticate.key = value;
                }
            }

            location.hash = "";
        }
        return {
            authenticate: authenticate,
            user: user,
            notify: notify,
            open: [home, userSettings, newRecipe]
        };
    }

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
            case ActionTypes.NOTIFY:
                state.notify = { 
                    active: action.active, 
                    timer: action.timer, 
                    message: (action.message?action.message:state.notify.message), 
                    type: (action.type?action.type:state.notify.type)
                };

                return Immutable.fromJS(state).toJS();
            case ActionTypes.AUTHENTICATE:
                if (action.active != null) {
                    state.authenticate.active = action.active
                }
                if (action.type != null) {
                    state.authenticate.type = action.type
                }
                return Immutable.fromJS(state).toJS();
            case ActionTypes.UPDATE_USER_STATUS:
                action.url = location.origin;
                this._processAction(action, null, true);
                return state;
            case ActionTypes.UPDATE_PASSWORD:
                var store = this;
                action.newPassword = MD5(action.newPassword);
                var callback = function (response) {
                    if (response != null) {
                        state.user = response;
                        state.authenticate.active = false;
                    }
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
            case ActionTypes.REGISTER:
                var store = this;
                var callback = function (response) {
                    if (typeof action.callback == "function") {
                        setTimeout(function() {
                            action.callback(response);
                        }, 0)
                    }
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
            case ActionTypes.LOGIN:
                var store = this;
                action.password = MD5(action.password);
                var callback = function (response) {
                    if (response.status == "success") {
                        state.user = response.user;
                    }
                    if (typeof action.callback == "function") {
                        setTimeout(function() {
                            action.callback(response);
                        }, 0)
                    }
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
            case ActionTypes.LOGOUT:
                var store = this;
                var callback = function() {
                    state = store.getInitialState();
                }

                this._processAction(action, callback, false);
                return Immutable.fromJS(state).toJS();
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