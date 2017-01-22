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
    }
};

export default Actions;