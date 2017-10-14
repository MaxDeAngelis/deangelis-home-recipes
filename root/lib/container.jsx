import React from 'react';
import Body from './body.jsx';
import { Component } from 'react';
import { Container } from 'flux/utils';
import RecipeStore from './recipeStore.js';
import Actions from './actions.js';

class SiteContainer extends Component {
    static getStores() {
        return [RecipeStore];
    }
    static calculateState(prevState) {
        return RecipeStore.getState();
    }
    render() {
        var openContent = null;
        for (var i = 0; i < this.state.open.length; i++) {
            if (this.state.open[i].active) {
                openContent = this.state.open[i];
            }
        }
        //console.log(openContent);
        //console.log(this.state);
        return (<Body
            sOpenContent={openContent}
            sOpenList={this.state.open}
            sUser={this.state.user}
            sAuthenticate={this.state.authenticate}
        
            aNewRecipe={Actions.newRecipe}
            aSaveRecipe={Actions.saveRecipe}
            aGetRecipe={Actions.getRecipe}
            aCloseRecipe={Actions.closeRecipe}
            aAddIngredient={Actions.addIngredient}
            aAddStep={Actions.addStep}
            aUpdateValue={Actions.updateValue}
            
            aAuthenticate={Actions.authenticate}
            aOpenContent={Actions.openContent}
            aServerRequest={Actions.serverRequest}
            aUpdateUserStatus={Actions.updateUserStatus}
            aRegister={Actions.register}
            aLogin={Actions.login}
            aLogout={Actions.logout}
            aUpdatePassword={Actions.updatePassword}
        />);
    }
}

export default Container.create(SiteContainer);
