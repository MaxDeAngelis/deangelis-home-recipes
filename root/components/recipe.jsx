import React from 'react';
import SingleValue from './singleValue.jsx';
import Steps from './steps.jsx';
import Ingredients from './ingredients.jsx';
import RecipeHeader from './recipeHeader.jsx';
import RecipeSubHeader from './recipeSubHeader.jsx';
import Cropper from './cropper.jsx';

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
        this.props.onSave(this.props.recipe);

        this.props.onUpdateValue('picture', "images/recipes/recipe_" + this.props.recipe.id + ".png");

        this.setState({editable: false});
    },
    afterImageCrop: function(imageUrl) {        
        this.props.onUpdateValue('picture', imageUrl);        
    },
    render: function() {
        if (this.props.recipe == null) {
            return false;
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
                    <Cropper
                        image={this.props.recipe.picture}
                        editable={this.state.editable}
                        onAfterCrop={this.afterImageCrop}
                    />
                </div>
                <RecipeSubHeader data= {this.props.recipe}/>
                
                <main className="recipe-body">
                        <Ingredients 
                            ingredients = {this.props.recipe.ingredients}
                            update = {this.props.onUpdateValue}
                            add = {this.props.onAddIngredient}
                            delete = {this.props.onDeleteIngredient}
                            editable = {this.state.editable}
                            aServerRequest = {this.props.aServerRequest}
                        />
                        <Steps 
                            steps = {this.props.recipe.steps}
                            update = {this.props.onUpdateValue}
                            add = {this.props.onAddStep}
                            delete = {this.props.onDeleteStep}
                            editable = {this.state.editable}
                        />
                </main>
            </main>
        );
    }
});

export default Recipe;
