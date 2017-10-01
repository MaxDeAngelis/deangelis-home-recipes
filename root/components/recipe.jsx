import React from 'react';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
import RecipeHeader from './recipeHeader.jsx';

require("../style/components/recipe.scss");

var Recipe = React.createClass({
    cropper: null,
    getInitialState: function() {
        return {
            editable: false
        };
    },
    edit: function() {
        this.setState({editable: true});
    },
    save: function() {
        this.props.aSaveRecipe(this.props.recipe);

        this.props.aUpdateValue('picture', "images/recipes/recipe_" + this.props.recipe.id + ".png");

        this.setState({editable: false});
    },
    render: function() {
        if (this.props.recipe == null) {
            return false;
        }
        return ( <main className="full-recipe">
                <RecipeHeader
                    recipe={this.props.recipe}
                    edit = {this.edit}
                    save = {this.save}
                    aUpdateValue = {this.props.aUpdateValue}
                    editable = {this.state.editable}
                />
                <main className="recipe-body">
                        <Ingredients 
                            ingredients = {this.props.recipe.ingredients}
                            aUpdateValue = {this.props.aUpdateValue}
                            aAddIngredient = {this.props.aAddIngredient}
                            aDeleteIngredient = {this.props.aDeleteIngredient}
                            editable = {this.state.editable}
                            aServerRequest = {this.props.aServerRequest}
                        />
                        <Steps 
                            steps = {this.props.recipe.steps}
                            aUpdateValue = {this.props.aUpdateValue}
                            aAddStep = {this.props.aAddStep}
                            aDeleteStep = {this.props.aDeleteStep}
                            editable = {this.state.editable}
                        />
                </main>
            </main>
        );
    }
});

export default Recipe;
