import React from 'react';
import Body from './body.jsx';
import { Container } from 'flux/utils';
import RecipeStore from './recipeStore.js';
import Actions from './actions.js';

function getStores() {
    return [RecipeStore];
}

function getState() {
    return {
        openRecipe: RecipeStore.getState(),

        // CALLBACKS
        saveRecipe: Actions.saveRecipe,
        getRecipe: Actions.getRecipe,
        newRecipe: Actions.newRecipe,
        addIngredient: Actions.addIngredient,
        addStep: Actions.addStep,
        deleteStep: Actions.deleteStep,
        deleteIngredient: Actions.deleteIngredient,
        updateValue: Actions.updateValue
    }
}

export default Container.createFunctional(Body, getStores, getState);
