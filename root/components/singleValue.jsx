import React from 'react';

var SingleValue = React.createClass({
    update: function(e) {
        this.props.data.onChange(this.props.data.id, e.target.value);
    },
    render: function() {
        var value = <span>{this.props.data.value}</span>;
        if (this.props.data.editable) {
            value = <input onChange = {this.update}
            			   value = {this.props.data.value}/>;
        }

        return ( <div className = "single-value-item" >
                	<label> {this.props.data.label} </label>
					{value}
				</div>
        );
    }
});

export default SingleValue;
