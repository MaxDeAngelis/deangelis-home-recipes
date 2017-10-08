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
        // STATE
        sOpenContent: openContent,
        sOpenList: state.open,

        // RECIPE HELPERS      
        aNewRecipe: Actions.newRecipe,
        aSaveRecipe: Actions.saveRecipe,
        aGetRecipe: Actions.getRecipe,
        aAddIngredient: Actions.addIngredient,
        aAddStep: Actions.addStep,
        aUpdateValue: Actions.updateValue,  
        
        // UTILITIES
        aOpenContent: Actions.openContent,
        aServerRequest: Actions.serverRequest
    }
}

export default Container.createFunctional(Body, getStores, getState);
