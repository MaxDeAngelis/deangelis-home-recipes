import React from 'react';

const Steps = React.createClass({
    renderDisplay: function(steps) {
        var key = 0;
        return steps.map(function(step) {
            return <li key={key++}> {step} </li>;
        });
    },
    renderForm: function(steps) {
        var me = this;
        var key = 0;
        return steps.map(function(step) {
            return <li key={key++} data-step-index={key - 1}>
                <textarea onChange={me.updateStep} value={step}></textarea>
                <a className="ti-trash" onClick={me.deleteStep}/>
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
        var steps = this.props.steps.split("|");
        var addLink;
        if (this.props.editable) {
            list = this.renderForm(steps);
            addLink = <a className="ti-plus" onClick={this.props.add}>Add step</a>
        } else {
            list = this.renderDisplay(steps);
        }

        return ( <section>
                <label className="data-label">Directions</label>
                <ol>{list}</ol>
                {addLink}
            </section>
        );
    }
});

export default Steps;
