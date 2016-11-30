import React from 'react';
import Search from './search.jsx';
require("../style/components/header.scss");

var Header = React.createClass({
    render: function() {
        return (<div className="header-content">
            <h1>Family Recipe</h1>
            <Search/>
            <nav>
                <a>Login</a>
                <a>Log Out</a>
            </nav>
        </div>
        );
    }
});

export default Header;
