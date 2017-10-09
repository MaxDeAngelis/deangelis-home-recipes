import React from 'react';
import Search from './search.jsx';
require("../style/components/header.scss");

var Header = React.createClass({
    render: function() {
        var userMenu = <a onClick={this.props.aHandleShowLogin}>Login</a>;

        if (this.props.sUser != null) {
            userMenu = <a><label>{this.props.sUser.firstName + " " + this.props.sUser.lastName}</label> <div className="ti-angle-down"></div></a>;
        }
        
        return (<header className="header-content">
            <Search 
                aGetRecipe={this.props.aGetRecipe}
                aServerRequest={this.props.aServerRequest} 
            />
            <nav>{userMenu}</nav>
        </header>
        );
    }
});

export default Header;
