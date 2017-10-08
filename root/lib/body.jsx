require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';
import Home from '../components/home.jsx';

function Body(props) {
    var openContent;
    if (props.sOpenContent.id == "home") {
        openContent = (<Home 
                            sHome={props.sOpenContent}
                            aGetRecipe={props.aGetRecipe}
                        />);
    } else {
        openContent = (<Recipe 
                            recipe={props.sOpenContent.recipe} 
                            aSaveRecipe={props.aSaveRecipe}
                            aAddIngredient={props.aAddIngredient}
                            aAddStep={props.aAddStep}
                            aUpdateValue={props.aUpdateValue}
                            aServerRequest={props.aServerRequest}
                        />);
    }

    return (<section className="app-body">
            <nav className="navigation">
                <Navigation 
                    sOpenList={props.sOpenList}
                    aOpenContent={props.aOpenContent}
                    aNewRecipe={props.aNewRecipe}
                />
            </nav>
            <div className="site-body">
                <Header 
                    aGetRecipe={props.aGetRecipe}
                    aServerRequest={props.aServerRequest}
                />
                <main className="open-content">
                    {openContent}
                </main>
                
            </div>
        </section>
    );
}

export default Body;
