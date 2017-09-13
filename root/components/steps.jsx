import React from 'react';

require("../style/components/steps.scss");

const Steps = React.createClass({
    renderDisplay: function(steps) {
        var key = 0;
        return steps.map(function(step) {
            return <li className="individual-step" key={key++}>{step}</li>;
        });
    },
    renderForm: function(steps) {
        var me = this;
        var key = 0;
        return steps.map(function(step) {
            return <li className="individual-step" key={key++} data-step-index={key - 1}>
                <div className="step-content">
                    <textarea onChange={me.updateStep} value={step}></textarea>
                    <a className="ti-trash" onClick={me.deleteStep}/>
                </div>
            </li> ;
        });
    },
    updateStep: function(e) {
        var newSteps = "";
        var list = e.target.parentNode.parentNode.childNodes;

        for (var i = 0; i < list.length; i++) {
            var value = list[i].querySelector("textarea").value;
            newSteps += value;

            if (i < list.length - 1) {
                newSteps += "|";
            }
        }

        this.props.update("steps", newSteps);
    },
    deleteStep: function(e) {
        var index = e.target.parentNode.dataset.stepIndex;

        this.props.delete(index);
    },
    render: function() {
        var list;
        var key = 0;
        if (this.props.steps === null || this.props.steps == "") {
            var steps = ["Please enter some steps ..."];
        } else {
            var steps = this.props.steps.split("|");            
        }
        var addLink;
        if (this.props.editable) {
            list = this.renderForm(steps);
            addLink = <a className="ti-plus" onClick={this.props.add}>Add step</a>
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
