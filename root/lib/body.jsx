require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';

function Body(props) {
  return (<section className="app-body">
            <Header getRecipe={props.getRecipe}/>
            <div className="site-body">
                <main className="open-content">
                    <Recipe 
                        recipe={props.openRecipe} 
                        onSave={props.saveRecipe}
                        onAddIngredient={props.addIngredient}
                        onAddStep={props.addStep}
                        onDeleteStep={props.deleteStep}
                        onDeleteIngredient={props.deleteIngredient}
                        onUpdateValue={props.updateValue}
                    />
                </main>
                <nav className="navigation">
                    <Navigation
                        onNew={props.newRecipe}
                    />
                </nav>
            </div>
        </section>);
}

export default Body;
