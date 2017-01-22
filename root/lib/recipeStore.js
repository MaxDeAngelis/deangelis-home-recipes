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
        $.ajax({
            url: '../processAction.php',
            method: 'GET',
            dataType: 'json',
            async: async,
            data: action,
            success: callback
        });
    }

    reduce(state, action) {
        switch (action.action) {
            case ActionTypes.SAVE_RECIPE:
                this._processAction(action, null, false);
                return state;
            case ActionTypes.GET_RECIPE:
                var recipe = null;
                var callback = function (response) {
                    recipe = response;
                }

                this._processAction(action, callback, false);
                
                state = recipe;
                return state;            
            default:
                return state;
        }
    }
}

export default new RecipeStore();