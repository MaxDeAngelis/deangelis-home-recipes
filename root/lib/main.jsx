import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../components/recipe.jsx';
import RecipeList from '../components/recipeList.jsx';

$.ajax({ url: '../processAction.php',
    data: {
        action: 'GET_LIST'
    },
    dataType: "json",
    type: 'POST',
    success: function(response) {
        ReactDOM.render( <RecipeList data = {response}/>,
            document.querySelector(".container")
        );
    }
});
/*
$.ajax({ url: '../processAction.php',
    data: {
        action: 'GET_RECIPE',
        id: '61'
    },
    dataType: "json",
    type: 'POST',
    success: function(response) {
        ReactDOM.render( <Recipe data = {response}/>,
            document.querySelector(".container")
        );
    }
});
*/
