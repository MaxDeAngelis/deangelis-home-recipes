import React from 'react';
import ReactDOM from 'react-dom';
require("../style/components/navigation.scss");

var Navigation = React.createClass({
    toggle: function(e) {
        var links = ReactDOM.findDOMNode(this).querySelectorAll(".link.hover");

        if (ReactDOM.findDOMNode(this).classList.contains("show")) {
            ReactDOM.findDOMNode(this).classList.remove("show");
            for (var i = 0; i < links.length; i++) {
                links[i].removeEventListener("click", this._hide);
            }
        } else {
            ReactDOM.findDOMNode(this).classList.add("show");
            for (var i = 0; i < links.length; i++) {
                links[i].addEventListener("click", this._hide);
            }
        }
    },
    _hide: function(e) {
        ReactDOM.findDOMNode(this).classList.remove("show");
    },
    _getId: function(element) {
        var currentElement = element;
        while (!currentElement.classList.contains("link")) {
            currentElement = currentElement.parentElement;
        }
        return currentElement.dataset.id;
    },
    handleClick: function(e) {
        this.props.aOpenContent(this._getId(e.target));
        e.stopPropagation();
    },
    handleClose: function(e) {
        this.props.aCloseRecipe(this._getId(e.target));
        e.stopPropagation();
    },
    render: function() {
        var nav = this;
        var list = this.props.sOpenList.map(function (item) {
            var classes = "link hover"; 
            if (item.active) {
                classes = "link hover active";
            }
            
            if (item.id == "home") {
                classes += " ti-home";
                return (<li key={item.id} className={classes} data-id="home" onClick={nav.handleClick}>
                    <span className="text">Home</span>
                </li>);
            } else if (item.id == "new") {
                if (nav.props.sUser != null) {
                    classes += " ti-plus";
                    return (<li key={item.id} className={classes} data-id="new" onClick={nav.props.aNewRecipe}>
                        <span className="text">New</span>
                    </li>);                    
                }            
            } else if(item.id == "user") {
                if (nav.props.sUser != null) {
                    classes += " ti-user";
                    return (<li key={item.id} className={classes} data-id="user" onClick={nav.handleClick}>
                        <span className="text">User settings</span>
                    </li>);
                }
            } else {
                var title = item.recipe.title;
                if (title == "") {
                    title = "New...";
                }
                return (<li key={item.id} data-id={item.id} className={classes} onClick={nav.handleClick}>
                    <img className="image" src={item.recipe.picture + "?" + item.recipe.dateModified} />
                    <span className="text truncate" title={title}>{title}</span>
                    <a className="ti-close" onClick={nav.handleClose}></a>{close}
                </li>);
            }
        });
        
        return (<nav className="navigation">
            <ul className="navigation-content">
                <li className="link"><a className="toggle" onClick={this.toggle}></a></li>
                {list}
            </ul>
        </nav>);
    }
});

export default Navigation;
