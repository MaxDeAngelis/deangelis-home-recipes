import React from 'react';
import SingleValue from './singleValue.jsx';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';

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
        this.setState({
            editable: false
        });
    },
    update: function(key, newValue) {
        var tempRecipe = this.state.recipe;
        tempRecipe[key] = newValue;
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
        var editButton = <button onClick = {this.edit}>Edit</button>;
        if (editable) {
            editButton = <button onClick = {this.save}>Save</button>;
        }

        return ( <main>
            <header><h3> { this.props.data.title } </h3></header>
            { editButton }
            <article>
                <SingleValue data = {this.getData("First name", "firstName")}/>
                <SingleValue data = {this.getData("Last name", "lastName")}/>
                <SingleValue data = {this.getData("Servings", "servings")}/>
                <SingleValue data = {this.getData("Cook time", "cookTime")}/>
                <SingleValue data = {this.getData("Prep time", "prepTime")}/>
                <SingleValue data = {this.getData("Category", "category")}/>
                <SingleValue data = {this.getData("Season", "season")}/>
                <SingleValue data = {this.getData("Date modified", "modDate")}/>
                <Steps data = {{
                    steps: this.state.recipe.steps,
                    editable: this.state.editable
                }}/>
                <Ingredients data = {{
                    ingredients: this.state.recipe.ingredients,
                    editable: this.state.editable
                }}/>
            </article>
            </main>
        );
    }
});

export default Recipe;
