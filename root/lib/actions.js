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
    closeRecipe(id) {
        Dispatcher.dispatch({
            action: ActionTypes.CLOSE_RECIPE,
            id: id
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
    },














    openContent(id) {
        Dispatcher.dispatch({
            action: ActionTypes.OPEN_CONTENT,
            key: id
        });
    },
    serverRequest(data, callback, async) {
        Dispatcher.dispatch({
            action: ActionTypes.SERVER_REQUEST,
            data: data,
            async: async,
            callback: callback
        });
    },
    authenticate(active, type) {
        Dispatcher.dispatch({
            action: ActionTypes.AUTHENTICATE,
            active: active,
            type: type
        });
    },
    register(firstName, lastName, username, email, callback) {
        Dispatcher.dispatch({
            action: ActionTypes.REGISTER,
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            callback: callback
        });
    },
    updateUserStatus(userId, status) {
        Dispatcher.dispatch({
            action: ActionTypes.UPDATE_USER_STATUS,
            userId: userId,
            status: status
        });
    },
    login(username, password, callback) {
        Dispatcher.dispatch({
            action: ActionTypes.LOGIN,
            username: username,
            password: password,
            callback: callback
        });
    },
    logout() {
        Dispatcher.dispatch({
            action: ActionTypes.LOGOUT
        });
    },
    updatePassword(userId, oldPassword, newPassword) {
        Dispatcher.dispatch({
            action: ActionTypes.UPDATE_PASSWORD,
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }
};

export default Actions;