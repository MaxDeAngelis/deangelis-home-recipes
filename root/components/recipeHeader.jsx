import React from 'react';
require("../style/components/recipeHeader.scss");

var RecipeHeader = React.createClass({
    componentDidUpdate: function() {
        if (this.props.data.editable) {
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
        this.props.data.update("title", e.target.value);
    },
    render: function() {
        var created = new Date(this.props.data.creation);
        var creator = <div className="addition-info">
                      <span className="author">{this.props.data.creator}</span>
                      <span className="creation-date">({created.toDateString()})</span>
                  </div>;

        if (this.props.data.editable) {
            return (<header className="recipe-title">
                        <div className="recipe-info">
                            <input className="title" 
                                value = {this.props.data.title}
                                placeholder="Please enter a new title ..."
                                onChange = {this.updateTitle}/>
                            <span className="ti-save" onClick = {this.props.data.save}></span>
                        </div>
                        {creator}
                    </header>);
        } else {
            if (this.props.data.title == "") {
                this.props.data.title = "Please enter a new title ...";
            }

            return (<header className="recipe-title">
                        <div className="recipe-info">
                            <span className="title">{ this.props.data.title }</span>
                            <span className="ti-pencil" onClick = {this.props.data.edit}></span>
                        </div>
                        {creator}
                     </header>);
        }
    }
});

export default RecipeHeader;
