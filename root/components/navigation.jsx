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
            <li className="link"><a className="toggle" onClick={this.toggle}></a></li>
            <li className="link ti-home hover" onClick={this.home}><span className="text">Home</span></li>
            <li className="link ti-user hover" onClick={this.home}><span className="text">Administrator</span></li>
            <li className="link ti-plus hover" onClick={this.home}><span className="text">New</span></li>
        </ul>
        );
    }
});

export default Navigation;
