import React from 'react';
import Cropper from './cropper.jsx';

require("../style/components/recipeHeader.scss");

var RecipeHeader = React.createClass({
    componentDidUpdate: function() {
        if (this.props.editable) {
            var field = document.querySelector(".recipe-title input.title");
            var parentElement = field.parentNode;
            var tempSpan = document.createElement("SPAN");
            tempSpan.style.overflow = "hidden";
            tempSpan.style.display = "inline-block";
            tempSpan.className = "title";
            if (field.value != "") {
                tempSpan.innerText = field.value;
            } else {
                tempSpan.innerText = field.placeholder;
            }
            
            parentElement.appendChild(tempSpan);

            field.style.width = tempSpan.scrollWidth + "px";
            parentElement.removeChild(tempSpan)
            tempSpan = null;
        }
    },
    updateTitle: function(e) {
        this.props.aUpdateValue("title", e.target.value);
    },
    afterImageCrop: function(imageUrl) {        
        this.props.aUpdateValue('picture', imageUrl);        
    },
    render: function() {
        var created = new Date(this.props.recipe.dateCreated);
        var titleClass = this.props.editable?"recipe-title editable":"recipe-title";
        
        if (!this.props.editable && (this.props.recipe.title == "" || this.props.recipe.title == "New...")) {
            this.props.recipe.title = "Please enter a new title ...";
        }

        return (<header className="recipe-header">
                <div className="recipe-info">
                    <div className={titleClass}>
                        <input className="title" 
                            value = {this.props.recipe.title}
                            placeholder="Please enter a new title ..."
                            onChange = {this.updateTitle}/>
                        <span className="ti-save" onClick = {this.props.save}></span>
                        <span className="title">{ this.props.recipe.title }</span>
                        <span className="ti-pencil" onClick = {this.props.edit}></span>
                    </div>
                    <div className="time-info">
                        <span className="ti-timer"></span> 
                        <span className="prep-time">
                            <label>Prep</label>
                            <span>{ this.props.recipe.prepTime }</span>
                        </span>
                        <span className="cook-time">
                            <label>Cook</label>
                            <span>{ this.props.recipe.cookTime }</span>
                        </span>
                        <span className="ti-pie-chart"></span> 
                        <span className="servings">
                            <span className="text">{ this.props.recipe.servings }</span>
                            <label>servings</label>
                        </span>
                    </div>
                    <div className="addition-info">
                        <span className="author">{this.props.recipe.firstName + " " + this.props.recipe.lastName}</span>
                        <span className="creation-date">({created.toDateString()})</span>
                    </div>
                </div>
                <Cropper
                    image={this.props.recipe.picture}
                    editable={this.props.editable}
                    onAfterCrop={this.afterImageCrop}
                />
            </header>
        );
    }
});

export default RecipeHeader;
