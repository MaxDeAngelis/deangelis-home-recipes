import React from 'react';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
import RecipeHeader from './recipeHeader.jsx';

require("../style/components/recipe.scss");

var Recipe = React.createClass({
    getInitialState: function() {
        return {
            editable: false,
            validate: false
        };
    },
    edit: function() {
        this.setState({editable: true});
    },
    save: function() {
        this.setState({validate: true});
        var isValid = this.validate(this.props.recipe);
        if (isValid) {
            this.props.aSaveRecipe(this.props.recipe);

            if (this.props.recipe.picture.indexOf("no-image-uploaded") == -1) {
                this.props.aUpdateValue('picture', "images/recipes/recipe_" + this.props.recipe.id + ".png");
            }

            this.setState({editable: false, validate: false});
            this.props.aNotify(true, "success", "Recipe successfully saved.", 500);
        }
    },
    validate: function(recipe) {
        var errors = [];
        if (recipe.title == "") {
            errors.push("Recipe title is required");
        }   

        if (recipe.servings == "") {
            errors.push("Recipe servings are required");
        } else if (recipe.servings < 0) {
            errors.push("Recipe servings must be positive");
        }

        if (recipe.ingredients.length == 0) {
            errors.push("Atleast one ingredient must be supplied");
        }
        var quantityFlagged = false;
        var unitFlagged = false;
        var nameFlagged = false;
        for (var i = 0; i < recipe.ingredients.length; i++) {
            var ingredient = recipe.ingredients[i];
            if (ingredient.quantity == "" && !quantityFlagged) {
                errors.push("Ingredient quantity is required");
                quantityFlagged = true;
            } else if (ingredient.quantity < 0 && !quantityFlagged) {
                errors.push("Ingredient quantity must be positive");
                quantityFlagged = true;
            }

            if (ingredient.units == "" && !unitFlagged) {
                errors.push("Ingredient units are required");
                unitFlagged = true;
            }

            if (ingredient.ingredientName == "" && !nameFlagged) {
                errors.push("Ingredient name is required");
                nameFlagged = true;
            }
        }

        if (recipe.steps.split("|").length == 0) {
            errors.push("Atleast one step must be supplied");
        }
        var steps = recipe.steps.split("|");
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            if (step == "") {
                errors.push("Step instructions are required");
                break;
            }
        }

        if (errors.length > 0) {
            var key = 0;
            var messageInner = errors.map(function(msg) {
                key += 1;
                return <li key={key}>{msg}</li>
            })

            var message = <div className="validation">
                <h3>Please correct flagged fields</h3>
                <ul>{messageInner}</ul>
            </div>;

            this.props.aNotify(true, "error", message, null);
            return false;
        } else {
            return true;
        }
        
    },
    render: function() {
        return ( <main className="full-recipe">
                <RecipeHeader
                    recipe={this.props.recipe}
                    edit = {this.edit}
                    save = {this.save}
                    aUpdateValue = {this.props.aUpdateValue}
                    editable = {this.state.editable}
                    validate = {this.state.validate}
                    sUser={this.props.sUser}
                />
                <main className="recipe-body">
                        <Ingredients 
                            ingredients = {this.props.recipe.ingredients}
                            aUpdateValue = {this.props.aUpdateValue}
                            aAddIngredient = {this.props.aAddIngredient}
                            editable = {this.state.editable}
                            validate = {this.state.validate}
                            aServerRequest = {this.props.aServerRequest}
                        />
                        <Steps 
                            steps = {this.props.recipe.steps}
                            aUpdateValue = {this.props.aUpdateValue}
                            aAddStep = {this.props.aAddStep}
                            editable = {this.state.editable}
                            validate = {this.state.validate}
                        />
                </main>
            </main>
        );
    }
});

export default Recipe;
