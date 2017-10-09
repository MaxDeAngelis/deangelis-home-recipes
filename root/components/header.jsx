import React from 'react';
import ReactDOM from 'react-dom';
import Search from './search.jsx';

require("../style/components/header.scss");

var Header = React.createClass({
    handleMenuLeave: function() {
        var userMenu = ReactDOM.findDOMNode(this).querySelector(".user-menu");
        userMenu.classList.remove("show-menu");
        userMenu.removeEventListener("mouseleave", this.handleMenuLeave);
    },
    handleUserMenuClick: function() {
        var userMenu = ReactDOM.findDOMNode(this).querySelector(".user-menu");

        if (userMenu.classList.contains("show-menu")) {
            userMenu.classList.remove("show-menu");
            userMenu.removeEventListener("mouseleave", this.handleMenuLeave);            
        } else {
            userMenu.classList.add("show-menu");
            userMenu.addEventListener("mouseleave", this.handleMenuLeave);
        }
    },
    render: function() {
        var userMenu = <nav className="user-menu">
            <a className="user-label" onClick={this.props.aHandleShowLogin}>Log in</a>
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
