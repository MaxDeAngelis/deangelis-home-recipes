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
      var me = this;
      $(ReactDOM.findDOMNode(this)).autocomplete({
        source: me.props.source,
        change: me.props.change
      });
    }
});

export default AutoComplete;
