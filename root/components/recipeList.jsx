import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './recipe.jsx';

var RecipeList = React.createClass({
    getInitialState: function() {
        return {
            list: []
        };
    },
    componentWillMount: function() {
        var me = this;
        $.get('../processAction.php',
            { action: 'GET_LIST' },
            function(response) {
                me.setState({ list: response });
            },
            "json"
        );
    },
    select: function(e) {
        $.get('../processAction.php',
            {
                action: 'GET_RECIPE',
                id: e.target.id
            },
            function(response) {
                ReactDOM.render( <Recipe data = {response}/>,
                    document.querySelector(".open-content")
                );
            },
            "json"
        );
    },
    render: function() {
        var me = this;
        var list = this.state.list.map(function(recipe) {
            return <div key={recipe.id} id={recipe.id} onClick={me.select} >{recipe.title}</div>;
        });

        return (<div>
            {list}
            <div className="open-content"></div>
        </div>
        );
    }
});

export default RecipeList;
