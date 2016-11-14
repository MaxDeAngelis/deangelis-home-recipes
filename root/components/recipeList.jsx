import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './recipe.jsx';

const RecipeList = React.createClass({
    getInitialState: function() {
        return {
            list: [],
            selectedRecipe: null
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
                var openContent = document.querySelector(".open-content");
                ReactDOM.unmountComponentAtNode(openContent);
                ReactDOM.render( <Recipe data = {response}/>, openContent);
            },
            "json"
        );
    },
    render: function() {
        var me = this;
        var key = 0;
        var list = this.state.list.map(function(recipe) {
            return <div key={key++} id={recipe.id} onClick={me.select} >{recipe.title}</div>;
        });

        return (<div>
            {list}
            <div className="open-content"></div>
        </div>
        );
    }
});

export default RecipeList;
