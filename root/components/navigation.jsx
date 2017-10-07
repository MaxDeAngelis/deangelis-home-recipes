import React from 'react';
import ReactDOM from 'react-dom';
require("../style/components/navigation.scss");

var Navigation = React.createClass({
    home: function() {
        var openContent = document.querySelector(".open-content");
        ReactDOM.unmountComponentAtNode(openContent);
        //ReactDOM.render(<Recipe data={response} />, openContent);
    },
    toggle: function() {
        var nav = document.querySelector(".navigation");
        if (nav.className == "navigation") {
            nav.className += " show";
        } else {
            nav.className = "navigation";
        }
    },
    handleClick: function(e) {
        var element = e.target;
        while (!element.classList.contains("link")) {
            element = element.parentElement;
        }
        var id = element.dataset.id;
        this.props.aOpenContent(id);
    },
    render: function() {
        var nav = this;
        var list = this.props.sRecents.map(function (item) {
            var classes = "link hover"; 
            if (item.active) {
                classes = "link hover active";
            }
            return (<li key={item.recipe.id} data-id={item.recipe.id} className={classes} onClick={nav.handleClick}>
                        <img className="image" src={item.recipe.picture + "?" + new Date().getTime()} />
                        <span className="text truncate" title={item.recipe.title}>{item.recipe.title}</span>
                    </li>);
        });
        return (<ul className="navigation-content">
            <li className="link"><a className="toggle" onClick={this.toggle}></a></li>
            <li className="link ti-home hover" data-id="home" onClick={this.home}><span className="text">Home</span></li>
            <li className="link ti-user hover" data-id="user" onClick={this.home}><span className="text">Administrator</span></li>
            <li className="link ti-plus hover" data-id="new" onClick={this.props.onNew}><span className="text">New</span></li>
            {list}
        </ul>
        );
    }
});

export default Navigation;
