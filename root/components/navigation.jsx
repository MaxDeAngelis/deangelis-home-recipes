import React from 'react';
import ReactDOM from 'react-dom';
require("../style/components/navigation.scss");

var Navigation = React.createClass({
    home: function() {
        debugger;
        var openContent = document.querySelector(".open-content");
        ReactDOM.unmountComponentAtNode(openContent);
        //ReactDOM.render(<Recipe data={response} />, openContent);
    },
    toggle: function() {
        debugger;
        var nav = document.querySelector(".navigation");
        if (nav.className == "navigation") {
            nav.className += " show";
        } else {
            nav.className = "navigation";
        }
    },
    render: function() {
        return (<ul className="navigation-content">
            <li><a className="link toggle" onClick={this.toggle}></a></li>
            <li><a className="link" onClick={this.home}>Home</a></li>
            <li><a className="link" onClick={this.home}>Administrator</a></li>
        </ul>
        );
    }
});

export default Navigation;
