import React from 'react';

var Header = React.createClass({
    render: function() {
        return (<div className="header-content">
            <h1>Family Recipes</h1>
            <input className="search" placeholder="Search"></input>
            <nav>
                <a>Login</a>
                <a>Log Out</a>
            </nav>
        </div>
        );
    }
});

export default Header;
