require("./style.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import RecipeList from '../components/recipeList.jsx';

ReactDOM.render(<Header/>,
    document.querySelector("header")
);
ReactDOM.render(<RecipeList/>,
    document.querySelector("main")
);
