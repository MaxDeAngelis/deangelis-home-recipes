import React from 'react';
import SingleValue from './singleValue.jsx';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
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
    componentDidUpdate: function() {
        if (this.state.editable) {
            var field = document.querySelector(".recipe-title > input");
            var parentElement = field.parentNode;
            var tempSpan = document.createElement("SPAN");
            tempSpan.style.overflow = "hidden";
            tempSpan.style.display = "inline-block";
            tempSpan.className = "text";
            tempSpan.innerText = field.value;
            parentElement.appendChild(tempSpan);

            field.style.width = tempSpan.scrollWidth + "px";
            parentElement.removeChild(tempSpan)
            tempSpan = null;
        }
    },
    updateTitle: function(e) {
        this.update("title", e.target.value);
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
        var header = <header className="recipe-title">
                        <span className="text">{ this.props.data.title }</span>
                        <span className="ti-pencil" onClick = {this.edit}></span>
                     </header>;

        var editButton = <span className="ti-pencil" onClick = {this.edit}></span>;
        var title = <span className="text">{ this.props.data.title }</span>;
        if (editable) {
            header = <header className="recipe-title">
                                <input className="text" onChange = {this.updateTitle} value = {this.props.data.title}/>
                                <span className="ti-save" onClick = {this.save}></span>
                            </header>;

            addLink = <a onClick = {this.addIngredient}>Add ingredient</a>
        }
        


        return ( <main className="full-recipe">
            {header}
            <section className="column column-3">
                <section>
                    <SingleValue data = {this.getData("Servings", "servings")}/>
                    <SingleValue data = {this.getData("Cook time", "cookTime")}/>
                    <SingleValue data = {this.getData("Prep time", "prepTime")}/>
                </section>
                <section>
                    <SingleValue data = {this.getData("Category", "category")}/>
                    <SingleValue data = {this.getData("Season", "season")}/>
                </section>
                <section>
                    <SingleValue data = {this.getData("First name", "firstName")}/>
                    <SingleValue data = {this.getData("Last name", "lastName")}/>
                    <SingleValue data = {this.getData("Date modified", "dateCreated")}/>
                </section>
            </section>
            <section className="column column-2">
                <Steps data = {{
                    steps: this.state.recipe.steps,
                    editable: this.state.editable
                }}/>
                <Ingredients data = {{
                    ingredients: this.state.recipe.ingredients,
                    editable: this.state.editable
                }}>
                    {addLink}
                </Ingredients>
            </section>
            </main>
        );
    }
});

export default Recipe;
