import React from 'react';

var Dropdown = React.createClass({
    render: function() {
        var key = 0;
        var options = this.props.options.map(function(option) {
            return <option key = {key++} value={option}>{option}</option>;
        });

        return(<select>
            {options}
        </select>);
    }
});

export default Dropdown;
