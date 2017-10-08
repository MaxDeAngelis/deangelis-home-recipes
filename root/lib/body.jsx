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

    function handleShowLogin() {
        document.querySelector(".app-login").classList.add("show");
        document.querySelector(".app-body").classList.add("hide");
    }

    function handleHideLogin() {
        document.querySelector(".app-login").classList.add("hide");
        document.querySelector(".app-body").classList.add("show");

        document.querySelector(".app-login").classList.remove("show");
        document.querySelector(".app-body").classList.remove("hide");

        setTimeout(function() {
            document.querySelector(".app-login").classList.remove("hide");
            document.querySelector(".app-body").classList.remove("show");
        }, 1500) 
    }

    return (<section className="app">
        <section className="app-login">
            <div className="app-login-inner">
                <header>
                    <label>Login</label><a className="ti-close" onClick={handleHideLogin}/>
                </header>
                <div className="app-login-form">
                    <input placeholder="Username" className="username" type="text"/>
                    <input placeholder="Password" className="password" type="password"/>
                </div>
                <footer>
                    <button>Login</button>
                </footer>
            </div>
        </section>
        <section className="app-body">
            <nav className="navigation">
                <Navigation 
                    sOpenList={props.sOpenList}
                    aOpenContent={props.aOpenContent}
                    aNewRecipe={props.aNewRecipe}
                    aCloseRecipe={props.aCloseRecipe}
                />
            </nav>
            <div className="site-body">
                <Header 
                    aHandleShowLogin={handleShowLogin}
                    aGetRecipe={props.aGetRecipe}
                    aServerRequest={props.aServerRequest}
                />
                <main className="open-content">
                    {openContent}
                </main>
                
            </div>
        </section>
    </section>);
}

export default Body;
