import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search.jsx';

require("../style/components/header.scss");

var Header = React.createClass({
    userMenu: null,
    componentDidMount: function() {
        this.userMenu = ReactDOM.findDOMNode(this).querySelector(".user-menu");
    },
    handleDismissOnClick: function(e) {        
        var currentNode = e.target;
        var isFromMenu = false;
        while(currentNode && currentNode != document.body) {
            if (currentNode == this.userMenu) {
                isFromMenu = true;
                break;
            }
            currentNode = currentNode.parentNode;
        }

        if (!isFromMenu) {
            this.userMenu.classList.remove("show-menu");
            window.removeEventListener("click", this.handleDismissOnClick);
        }
    },
    handleUserMenuClick: function(e) {
        e.stopPropagation();

        if (this.userMenu.classList.contains("show-menu")) {
            this.userMenu.classList.remove("show-menu");
            window.removeEventListener("click", this.handleDismissOnClick);            
        } else {
            this.userMenu.classList.add("show-menu");
            window.addEventListener("click", this.handleDismissOnClick);
        }
    },
    handleAuthenticate: function(e) {
        this.props.aAuthenticate(true, "login");
    },
    render: function() {
        var userMenu = <nav className="user-menu">
            <a className="user-label" onClick={this.handleAuthenticate}>Log in</a>
        </nav>;

        if (this.props.sUser != null) {
            userMenu = (<nav className="user-menu">
                <a onClick={this.handleUserMenuClick}>
                    <label className="user-label">{this.props.sUser.firstName + " " + this.props.sUser.lastName}</label>
                    <div className="ti-angle-down"></div>
                </a>
                <div className="menu-options">
                    <a className="item" onClick={this.props.aLogout}>Log out</a>
                </div>
            </nav>);
        }
        
        return (<header className="header-content">
            <Search 
                aGetRecipe={this.props.aGetRecipe}
                aServerRequest={this.props.aServerRequest} 
            />
            {userMenu}
        </header>
        );
    }
});

export default Header;
