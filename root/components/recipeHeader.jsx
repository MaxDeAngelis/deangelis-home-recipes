import React from 'react';
import Cropper from './cropper.jsx';
import Time from './time.jsx';

require("../style/components/recipeHeader.scss");

var RecipeHeader = React.createClass({
    updateTitle: function(e) {
        this.props.aUpdateValue("title", e.target.value);
    },
    updatePrepTime: function(time) {
        this.props.aUpdateValue('prepTime', time); 
    },
    updateCookTime: function(time) {
        this.props.aUpdateValue('cookTime', time); 
    },
    updateServings: function(e) {
        this.props.aUpdateValue('servings', e.target.value); 
    },
    afterImageCrop: function(imageUrl) {        
        this.props.aUpdateValue('picture', imageUrl);        
    },
    handlePublicChange: function(e) {
        this.props.aUpdateValue('public', e.target.checked);  
    },
    render: function() {
        // Split timestamp into [ Y, M, D, h, m, s ]
        var time = this.props.recipe.dateModified.split(/[- :]/);

        // Apply each element to the Date function
        var created = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]));

        var infoClasses = this.props.editable?"recipe-info editable":"recipe-info";
        
        if (this.props.recipe.public) {
            var publicNote = <label className="public-note">This recipe is public (Everyone can view)</label>;
        } else {
            var publicNote = <label className="public-note">This recipe is private (Only you can view)</label>;
        }
        var title = this.props.recipe.title;
        if (!this.props.editable && (title == "" || title == "New...")) {
            title = "Please enter a new title ...";
        }
        var titleClasses = "title";
        if (this.props.validate && (this.props.recipe.title == null || this.props.recipe.title == "")) {
            titleClasses += " required";
        }
        var uniqueId = "id-" + new Date().getTime();

        var controls = "";
        if (this.props.sUser != null && this.props.sUser.userId == this.props.recipe.creator) {
            controls = (<div>
                <span className="ti-save" onClick = {this.props.save}></span>
                <span className="ti-close" onClick = {this.props.cancel}></span>
                <span className="ti-pencil" onClick = {this.props.edit}></span>
            </div>);
        }

        var servings = <span className="text">{ this.props.recipe.servings }</span>;
        if (this.props.editable) {
            var servingsClasses = "serving-value";
            if (this.props.validate && (this.props.recipe.servings == null || this.props.recipe.servings == "" || this.props.recipe.servings < 0)) {
                servingsClasses += " required";
            }

            servings = <input type="number" 
                            className={servingsClasses}
                            value={this.props.recipe.servings}
                            onChange={this.updateServings}
                        />;
        }

        return (<header className="recipe-header">
                <div className={infoClasses}>
                    <div className="recipe-title">
                        <input className={titleClasses}
                            value = {this.props.recipe.title}
                            placeholder="Please enter a new title ..."
                            onChange = {this.updateTitle}
                        />
                        
                        <span className={titleClasses}>{title}</span>
                        {controls}
                    </div>
                    <div className="time-info">
                        <span className="ti-timer"></span> 
                        <span className="prep-time">
                            <label>Prep</label>
                            <Time
                                value={this.props.recipe.prepTime}
                                customClass="prep-time"
                                editable={this.props.editable}
                                update={this.updatePrepTime}
                            />
                        </span>
                        <span className="cook-time">
                            <label>Cook</label>
                            <Time
                                value={this.props.recipe.cookTime}
                                customClass="cook-time"
                                editable={this.props.editable}
                                update={this.updateCookTime}
                            />
                        </span>
                        <span className="ti-pie-chart"></span> 
                        <span className="servings">
                            {servings}
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
                    image={this.props.recipe.picture + "?" + this.props.recipe.dateModified}
                    editable={this.props.editable}
                    onAfterCrop={this.afterImageCrop}
                />
            </header>
        );
    }
});

export default RecipeHeader;
