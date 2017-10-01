require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';

function Body(props) {
  return (<section className="app-body">
            <nav className="navigation">
                <Navigation onNew={props.newRecipe}/>
            </nav>
            <div className="site-body">
                <Header 
                    getRecipe={props.getRecipe}
                    aServerRequest={props.serverRequest}
                />
                <main className="open-content">
                    <Recipe 
                        recipe={props.openRecipe} 
                        aSaveRecipe={props.saveRecipe}
                        aAddIngredient={props.addIngredient}
                        aAddStep={props.addStep}
                        aDeleteStep={props.deleteStep}
                        aDeleteIngredient={props.deleteIngredient}
                        aUpdateValue={props.updateValue}
                        aServerRequest={props.serverRequest}
                    />
                </main>
                
            </div>
        </section>);
}

export default Body;
