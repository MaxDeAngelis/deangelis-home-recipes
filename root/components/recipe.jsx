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
    componentDidUpdate: function() {
        var that = this;
        if (this.props.recipe == null) {
            return false;
        }
        var croppicContainerModalOptions = {
                uploadUrl : '/processAction.php',
                cropUrl : '/processAction.php',
                modal : true,
                imgEyecandyOpacity : 0.4,
                doubleZoomControls:false,
                customUploadButtonId:'EditImage',
                //processInline:true,
                //loadPicture: this.props.recipe.picture,
                loaderHtml :'<div class="loading">',
                uploadData :{
                    action : "UPLOAD_IMAGE"   
                },
                cropData : {
                    action : "CROP_IMAGE"
                },
                onAfterImgCrop: function(o) {
                   debugger;
                   that.props.onUpdateValue('picture', o.url);
                }
        }
        var cropContainerModal = new Croppic('Cropper', croppicContainerModalOptions);
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
                    <button id='EditImage'>Edit</button>
                    <img id='Cropper' src={this.props.recipe.picture}/>
                </div>
                <RecipeSubHeader data= {this.props.recipe}/>
                
                <main className="recipe-body">
                        <Ingredients 
                            ingredients = {this.props.recipe.ingredients}
                            update = {this.props.onUpdateValue}
                            add = {this.props.onAddIngredient}
                            delete = {this.props.onDeleteIngredient}
                            editable = {this.state.editable}
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
