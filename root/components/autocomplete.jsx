import React from 'react';
import ReactDOM from 'react-dom';

var AutoComplete = React.createClass({
    render: function() {
        return(<input value={this.props.value}
                   onChange={this.props.change}></input>);
    },
    componentDidMount: function() {
      this.updateAutocomplete();
    },

    componentDidUpdate: function() {
      this.updateAutocomplete();
    },

    updateAutocomplete: function() {
      var source = this.props.source;
      $(ReactDOM.findDOMNode(this)).autocomplete({source: source});
    }
});

export default AutoComplete;
