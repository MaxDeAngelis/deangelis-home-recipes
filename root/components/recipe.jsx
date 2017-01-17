import React from 'react';
import SingleValue from './singleValue.jsx';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
import RecipeHeader from './recipeHeader.jsx';
import RecipeSubHeader from './recipeSubHeader.jsx';
require("../style/components/recipe.scss");

var Recipe = React.createClass({
    getInitialState: function() {
        return {
            recipe: this.props.data,
            editing: false
        };
    },
    edit: function() {
        this.setState({
            editable: true
        });
    },
    save: function() {
        console.log(this.state.recipe)
        this.setState({
            editable: false
        });

        $.get('../processAction.php',
            {
                action: 'SAVE_RECIPE',
                recipe: this.state.recipe
            },
            function (response) {
                debugger;
            },
            "json"
        );
    },
    update: function(key, newValue) {
        var tempRecipe = this.state.recipe;
        tempRecipe[key] = newValue;
        console.log(key + " - " + newValue)
        this.setState({
            recipe: tempRecipe
        });
        console.log(newValue)
    },
    addIngredient: function() {
        var tempRecipe = this.state.recipe;

        tempRecipe.ingredients.push({
            id: "",
            unit: "",
            ingredientName: ""
        })

        this.setState({
            recipe: tempRecipe
        });
    },
    getData: function(label, key) {
        return {
            label: label,
            value: this.state.recipe[key],
            id: key,
            editable: this.state.editable,
            onChange: this.update
        }
    },
    render: function() {
        var editable = this.state.editable;
        var recipeData = this.state.recipe;
        if (recipeData == null) {
            return false;
        }
        var addLink;
        if (editable) {
            addLink = <a onClick = {this.addIngredient}>Add ingredient</a>
        }
        /*
            <SingleValue data = {this.getData("Category", "category")}/>
            <SingleValue data = {this.getData("Season", "season")}/>
        */
        return ( <main className="full-recipe">
                <RecipeHeader data= {{
                    title: this.props.data.title,
                    creator: this.props.data.firstName + " " + this.props.data.lastName,
                    creation: this.props.data.dateCreated,
                    edit: this.edit,
                    save: this.save,
                    update: this.update,
                    editable: this.state.editable
                }}/>
                <div className="recipe-images">
                    <img src={this.state.recipe.picture}/>
                </div>
                <RecipeSubHeader data= {this.props.data}/>
                
                <main className="recipe-body">
                        <Ingredients data = {{
                            ingredients: this.state.recipe.ingredients,
                            update: this.update,
                            editable: this.state.editable
                        }}>
                            {addLink}
                        </Ingredients>
                        <Steps data = {{
                            steps: this.state.recipe.steps,
                            editable: this.state.editable
                        }}/>
                </main>
            </main>
        );
    }
});

export default Recipe;
