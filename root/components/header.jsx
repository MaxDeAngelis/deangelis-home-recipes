import React from 'react';
import Search from './search.jsx';
require("../style/components/header.scss");

var Header = React.createClass({
    render: function() {
        
        return (<header className="header-content">
            <Search 
                aGetRecipe={this.props.aGetRecipe}
                aServerRequest={this.props.aServerRequest} 
            />
            <nav>
                <a onClick={this.props.aHandleShowLogin}>Login</a>
            </nav>
        </header>
        );
    }
});

export default Header;
