import React from 'react';

const Steps = React.createClass({
    renderDisplay: function(steps) {
        var key = 0;
        return steps.map(function(step) {
            return <li key={key++}> {step} </li>;
        });
    },
    renderForm: function(steps) {
        var key = 0;
        return steps.map(function(step) {
            return <li key={key++}><textarea value = {step}/></li> ;
        });
    },
    render: function() {
        var list;
        var key = 0;
        var steps = this.props.data.steps.split("|");
        if (this.props.data.editable) {
            list = this.renderForm(steps);
        } else {
            list = this.renderDisplay(steps);
        }

        return ( <section>
                <label className="data-label">Steps</label>
                <ol> {list} </ol>
            </section>
        );
    }
});

export default Steps;
