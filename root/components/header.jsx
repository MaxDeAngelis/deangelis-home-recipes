import React from 'react';
import Search from './search.jsx';
require("../style/components/header.scss");

var Header = React.createClass({
    render: function() {
        return (<header className="header-content">
            <Search 
                aGetRecipe={this.props.aGetRecipe}
                aServerRequest={this.props.aServerRequest} />
            <nav>
                <a><label>Max DeAngelis</label> <div className="ti-angle-down"></div></a>
            </nav>
        </header>
        );
    }
});

export default Header;
