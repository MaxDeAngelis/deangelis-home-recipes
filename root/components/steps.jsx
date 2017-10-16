import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/steps.scss");

const Steps = React.createClass({
    renderDisplay: function(steps) {
        var key = 0;
        return steps.map(function(step) {
            if (step == "") {
                step = "Please enter a step description...";
            }

            return <li className="individual-step" key={key++}>{step}</li>;
        });
    },
    renderForm: function(steps) {
        var me = this;
        var key = -1;
        return steps.map(function(step) {
            key += 1;
            var stepClasses;
            if (me.props.validate) {
                if (step == null || step == "") {
                    stepClasses = "required";
                }
            }
            return <li className="individual-step" key={key} data-index={key}>
                <div className="step-content">
                    <textarea  
                        value={step}
                        placeholder="Please enter a step description..."
                        className = {stepClasses}
                        onChange={me.updateStep}>
                    </textarea>
                    <a className="ti-trash" onClick={me.deleteStep}/>
                </div>
            </li> ;
        });
    },
    updateStep: function(e) {
        var newSteps = "";
        var list = ReactDOM.findDOMNode(this).querySelector(".steps-list").childNodes;

        for (var i = 0; i < list.length; i++) {
            var value = list[i].querySelector("textarea").value;
            newSteps += value;

            if (i < list.length - 1) {
                newSteps += "|";
            }
        }

        this.props.aUpdateValue("steps", newSteps);
    },
    deleteStep: function(e) {
        var itemToCheck = e.target;
        while (itemToCheck && !itemToCheck.classList.contains("individual-step")) {
            itemToCheck = itemToCheck.parentNode;
        }

        var list = ReactDOM.findDOMNode(this).querySelector(".steps-list").childNodes;
        var itemToRemove = null;
        for (var i = 0; i < list.length; i++) {
            if (list[i] === itemToCheck) {
                itemToRemove = i;
                break;
            }
        }

        if (itemToRemove != null) {
            var steps = this.props.steps.split("|");  
            steps.splice(itemToRemove, 1);

            this.props.aUpdateValue("steps", steps.join("|"));
        }
    },
    render: function() {
        var list;
        var key = 0;
        var steps = [""];
        if (this.props.steps != null ) {
            steps = this.props.steps.split("|");            
        }
        var addLink;
        if (this.props.editable) {
            list = this.renderForm(steps);
            addLink = <div className="add-new" onClick={this.props.aAddStep}>
                    <a className="ti-plus"></a>
                    <label>Add step</label>
                </div>
        } else {
            list = this.renderDisplay(steps);
        }

        return ( <section className="recipe-steps">
                <label className="data-label">Directions</label>
                <ol className="steps-list">{list}</ol>
                {addLink}
            </section>
        );
    }
});

export default Steps;
