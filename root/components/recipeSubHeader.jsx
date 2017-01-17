import React from 'react';
require("../style/components/recipeSubHeader.scss");

var RecipeSubHeader = React.createClass({
    render: function() {
        return ( <div className="recipe-sub-header">
                <span className="ti-timer"></span> 
                <span className="prep-time">
                    <label>Prep</label>
                    <span>{ this.props.data.cookTime }</span>
                </span>
                <span className="cook-time">
                    <label>Cook</label>
                    <span>{ this.props.data.cookTime }</span>
                </span>
                <span className="ti-pie-chart"></span> 
                <span className="servings">
                    <span className="text">{ this.props.data.servings }</span>
                    <label>servings</label>
                </span>
            </div>
        );
    }
});

export default RecipeSubHeader;
