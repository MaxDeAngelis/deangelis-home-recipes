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
    
    var openContent = null;
    for (var i = 0; i < state.open.length; i++) {
        if (state.open[i].active) {
            openContent = state.open[i];
        }
    }

    return {
        sOpenContent: openContent,
        sRecents: state.recents,

        aOpenContent: Actions.openContent,
        aGetRecipe: Actions.getRecipe,

        // CALLBACKS
        saveRecipe: Actions.saveRecipe,
        newRecipe: Actions.newRecipe,
        addIngredient: Actions.addIngredient,
        addStep: Actions.addStep,
        updateValue: Actions.updateValue,
        serverRequest: Actions.serverRequest
    }
}

export default Container.createFunctional(Body, getStores, getState);
