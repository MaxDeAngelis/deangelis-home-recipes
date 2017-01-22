import React from 'react';
import SingleValue from './singleValue.jsx';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
import RecipeHeader from './recipeHeader.jsx';
import RecipeSubHeader from './recipeSubHeader.jsx';
import Actions from '../lib/actions.js';

require("../style/components/recipe.scss");

var Recipe = React.createClass({
    getInitialState: function() {
        return {
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

        this.props.onSave(this.props.recipe);
    },
    render: function() {
        if (this.props.recipe == null) {
            return false;
        }

        var addLink;
        if (this.state.editable) {
            addLink = <a onClick = {this.props.onAddIngredient}>Add ingredient</a>
        }

        return ( <main className="full-recipe">
                <RecipeHeader data= {{
                    title: this.props.recipe.title,
                    creator: this.props.recipe.firstName + " " + this.props.recipe.lastName,
                    creation: this.props.recipe.dateCreated,
                    edit: this.edit,
                    save: this.save,
                    update: this.props.onUpdateValue,
                    editable: this.state.editable
                }}/>
                <div className="recipe-images">
                    <img src={this.props.recipe.picture}/>
                </div>
                <RecipeSubHeader data= {this.props.recipe}/>
                
                <main className="recipe-body">
                        <Ingredients data = {{
                            ingredients: this.props.recipe.ingredients,
                            update: this.props.onUpdateValue,
                            editable: this.state.editable
                        }}>
                            {addLink}
                        </Ingredients>
                        <Steps data = {{
                            steps: this.props.recipe.steps,
                            editable: this.state.editable
                        }}/>
                </main>
            </main>
        );
    }
});

export default Recipe;
