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
                            aSaveRecipe={props.saveRecipe}
                            aAddIngredient={props.addIngredient}
                            aAddStep={props.addStep}
                            aUpdateValue={props.updateValue}
                            aServerRequest={props.serverRequest}
                        />);
    }

    return (<section className="app-body">
            <nav className="navigation">
                <Navigation 
                    onNew={props.newRecipe}
                    sRecents={props.sRecents}
                    aOpenContent={props.aOpenContent}/>
            </nav>
            <div className="site-body">
                <Header 
                    aGetRecipe={props.aGetRecipe}
                    aServerRequest={props.serverRequest}
                />
                <main className="open-content">
                    {openContent}
                </main>
                
            </div>
        </section>
    );
}

export default Body;
