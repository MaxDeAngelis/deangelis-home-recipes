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
    addIngredient() {
        Dispatcher.dispatch({
            action: ActionTypes.ADD_INGREDIENT
        });
    },
    removeIngredient() {
        Dispatcher.dispatch({
            action: ActionTypes.REMOVE_INGREDIENT,
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