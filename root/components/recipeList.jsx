import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './recipe.jsx';

var RecipeList = React.createClass({

    select: function(e) {
        $.ajax({ url: '../processAction.php',
            data: {
                action: 'GET_RECIPE',
                id: e.target.id
            },
            dataType: "json",
            type: 'POST',
            success: function(response) {
                ReactDOM.render( <Recipe data = {response}/>,
                    document.querySelector(".container")
                );
            }
        });
    },
    render: function() {
        var me = this;
        var list = this.props.data.map(function(recipe) {
            return <div key={recipe.id} id={recipe.id} onClick={me.select} >{recipe.title}</div>;
        });

        return (<div>
            {list}
        </div>
        );
    }
});

export default RecipeList;
