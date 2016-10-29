import React from 'react';

var Steps = React.createClass({
    renderDisplay: function(steps) {
        return steps.map(function(step) {
            return <li > {
                step
            } < /li>;
        });
    },
    renderForm: function(steps) {
        return steps.map(function(step) {
            return <li><textarea value = {step}/></li>;
        });
    },
    render: function() {
        var list;
        var steps = this.props.data.steps.split("|");
        if (this.props.data.editable) {
            list = steps.map(function(step) {
                return <li><textarea value = {step}/></li> ;
            });
        } else {
            list = steps.map(function(step) {
                return <li> {step} </li>;
            });
        }

        return ( <section>
                <h3> Steps: </h3>
                <ol> {list} </ol>
            </section>
        );
    }
});

export default Steps;
