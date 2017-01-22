import React from 'react';
import Search from './search.jsx';
require("../style/components/header.scss");

var Header = React.createClass({
    render: function() {
        return (<header className="header-content">
            <h1>Family Recipe</h1>
            <Search getRecipe={this.props.getRecipe} />
            <nav>
                <a>Login</a>
                <a>Log Out</a>
            </nav>
        </header>
        );
    }
});

export default Header;
