import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/autocomplete.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/autocomplete';

var AutoComplete = React.createClass({
    render: function() {
        return(<input value ={this.props.value}
                   onChange ={this.props.change}></input>);
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
