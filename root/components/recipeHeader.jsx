import React from 'react';
import Cropper from './cropper.jsx';
import Time from './time.jsx';

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
    updatePrepTime: function(time) {
        this.props.aUpdateValue('prepTime', time); 
    },
    updateCookTime: function(time) {
        this.props.aUpdateValue('cookTime', time); 
    },
    afterImageCrop: function(imageUrl) {        
        this.props.aUpdateValue('picture', imageUrl);        
    },
    handlePublicChange: function(e) {
        this.props.aUpdateValue('public', e.target.checked);  
    },
    render: function() {
        var created = new Date(this.props.recipe.dateCreated);
        var infoClasses = this.props.editable?"recipe-info editable":"recipe-info";
        
        if (this.props.recipe.public) {
            var publicNote = <label className="public-note">This recipe is public (Everyone can view)</label>;
        } else {
            var publicNote = <label className="public-note">This recipe is private (Only you can view)</label>;
        }
        
        if (!this.props.editable && (this.props.recipe.title == "" || this.props.recipe.title == "New...")) {
            this.props.recipe.title = "Please enter a new title ...";
        }
        var uniqueId = "id-" + new Date().getTime();

        var controls = "";
        if (this.props.sUser != null && this.props.sUser.userId == this.props.recipe.creator) {
            controls = (<div>
                <span className="ti-save" onClick = {this.props.save}></span>
                <span className="ti-pencil" onClick = {this.props.edit}></span>
            </div>);
        }

        return (<header className="recipe-header">
                <div className={infoClasses}>
                    <div className="recipe-title">
                        <input className="title" 
                            value = {this.props.recipe.title}
                            placeholder="Please enter a new title ..."
                            onChange = {this.updateTitle}
                        />
                        
                        <span className="title">{ this.props.recipe.title }</span>
                        {controls}
                    </div>
                    <div className="time-info">
                        <span className="ti-timer"></span> 
                        <span className="prep-time">
                            <label>Prep</label>
                            <Time
                                value={this.props.recipe.prepTime}
                                editable={this.props.editable}
                                update={this.updatePrepTime}
                            />
                        </span>
                        <span className="cook-time">
                            <label>Cook</label>
                            <Time
                                value={this.props.recipe.cookTime}
                                editable={this.props.editable}
                                update={this.updateCookTime}
                            />
                        </span>
                        <span className="ti-pie-chart"></span> 
                        <span className="servings">
                            <span className="text">{ this.props.recipe.servings }</span>
                            <label>servings</label>
                        </span>
                    </div>
                    <div className="addition-info">
                        <span className="author">{this.props.recipe.firstName + " " + this.props.recipe.lastName}</span>
                        <span className="creation-date"> ({created.toDateString()})</span>
                    </div>
                    <div className="public-option">
                        {publicNote}
                        <label className="toggle-label">Make recipe public</label>
                        <label id={uniqueId} className="toggle-switch">
                            <input htmlFor={uniqueId} type="checkbox" 
                                checked={this.props.recipe.public} 
                                onChange={this.handlePublicChange}
                            />
                            <span className="slider"></span>
                        </label>
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
