import ActionTypes from './actionTypes.js';
import Dispatcher from './dispatcher.js';

const Actions = {
    saveRecipe(data) {
        Dispatcher.dispatch({
            action: ActionTypes.SAVE_RECIPE,
            recipe: data
        });
    },
    getRecipe(data) {
        Dispatcher.dispatch({
            action: ActionTypes.GET_RECIPE,
            id: data
        });
    },
    newRecipe() {
        Dispatcher.dispatch({
            action: ActionTypes.NEW_RECIPE
        });
    },
    addIngredient() {
        Dispatcher.dispatch({
            action: ActionTypes.ADD_INGREDIENT
        });
    },
    addStep() {
        Dispatcher.dispatch({
            action: ActionTypes.ADD_STEP
        });
    },
    deleteStep(data) {
        Dispatcher.dispatch({
            action: ActionTypes.DELETE_STEP,
            index: data
        });
    },
    deleteIngredient(data) {
        Dispatcher.dispatch({
            action: ActionTypes.DELETE_INGREDIENT,
            index: data
        });
    },
    updateValue(key, value) {
        Dispatcher.dispatch({
            action: ActionTypes.UPDATE_VALUE,
            key: key,
            value: value
        });
    }

};

export default Actions;