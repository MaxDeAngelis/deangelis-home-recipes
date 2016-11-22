import React from 'react';
import ReactDOM from 'react-dom';

var Navigation = React.createClass({
    toggle: function() {
        var nav = document.querySelector(".navigation");
        if (nav.className == "navigation") {
            nav.className += " show";
        } else {
            nav.className = "navigation";
        }
    },
    render: function() {
        return (<div className="navigation-content">
            <div className="toggle" onClick={this.toggle}/>
        </div>
        );
    }
});

export default Navigation;
