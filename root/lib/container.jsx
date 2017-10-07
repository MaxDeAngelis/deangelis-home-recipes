import React from 'react';
import Body from './body.jsx';
import { Container } from 'flux/utils';
import RecipeStore from './recipeStore.js';
import Actions from './actions.js';

function getStores() {
    return [RecipeStore];
}

function getState() {
    var state = RecipeStore.getState();

    var openRecipe = null;
    for (var i = 0; i < state.open.length; i++) {
        if (state.open[i].active) {
            openRecipe = state.open[i].recipe;
        }
    }

    return {
        sRecipe: openRecipe,
        sRecents: state.recents,

        aOpenContent: Actions.openContent,
        // CALLBACKS
        saveRecipe: Actions.saveRecipe,
        getRecipe: Actions.getRecipe,
        newRecipe: Actions.newRecipe,
        addIngredient: Actions.addIngredient,
        addStep: Actions.addStep,
        updateValue: Actions.updateValue,
        serverRequest: Actions.serverRequest
    }
}

export default Container.createFunctional(Body, getStores, getState);
