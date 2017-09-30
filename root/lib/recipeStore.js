import Immutable from 'immutable';
import { ReduceStore } from 'flux/utils';
import ActionTypes from './actionTypes.js';
import Dispatcher from './dispatcher.js';

class RecipeStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        return null;
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

    reduce(state, action) {
        switch (action.action) {
            case ActionTypes.SERVER_REQUEST:
                this._processAction(action.data, action.callback, action.async);
                return state;
            case ActionTypes.SAVE_RECIPE:
                this._processAction(action, null, false);
                return state;
            case ActionTypes.GET_RECIPE:
                var recipe = null;
                var callback = function (response) {
                    recipe = response;
                }

                this._processAction(action, callback, false);
                return Object.assign({}, state, recipe);   
            case ActionTypes.NEW_RECIPE:
                var recipe = null;
                var callback = function (response) {
                    recipe = response;
                }

                this._processAction(action, callback, false);
                return Object.assign({}, state, recipe);  
            case ActionTypes.ADD_INGREDIENT:
                var newState = this.getState();
                newState.ingredients.push({
                    id: "",
                    unit: "",
                    ingredientName: ""
                });    
                return Object.assign({}, state, newState);  
            case ActionTypes.ADD_STEP:
                var newState = this.getState();
                newState.steps += "|";
                return Object.assign({}, state, newState);  
            case ActionTypes.DELETE_STEP:
                var newState = this.getState();
                var steps = newState.steps.split("|");
                steps.splice(action.index, 1);
                newState.steps = steps.join("|");
                return Object.assign({}, state, newState); 
            case ActionTypes.DELETE_INGREDIENT:
                var newState = this.getState();
                newState.ingredients.splice(action.index, 1);
                return Object.assign({}, state, newState);  
            case ActionTypes.UPDATE_VALUE:
                var newState = this.getState();
                newState[action.key] = action.value;
                return Object.assign({}, state, newState); 
            default:
                return state;
        }
    }
}

export default new RecipeStore();