require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';
import Home from '../components/home.jsx';

function Body(props) {
    function handleKeyUp(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }
    function handleShowLogin() {
        document.querySelector(".app-login").classList.add("show");
        document.querySelector(".app-body").classList.add("hide");

        document.querySelector(".app-login .username").focus();
        window.addEventListener("keyup", handleKeyUp);
    }
    function handleHideLogin() {
        var appLogin =document.querySelector(".app-login");
        var appBody = document.querySelector(".app-body");

        if (appLogin && appBody) {
            // Reverse the animation delay
            appLogin.classList.add("hide");
            appBody.classList.add("show");

            // Pull off classes that animate 
            appLogin.classList.remove("show");
            appBody.classList.remove("hide");

            // Clean up when animations are finished
            setTimeout(function() {
                appLogin.classList.remove("hide");
                appBody.classList.remove("show");
            }, 1500);
        } 
        window.removeEventListener("keyup", handleKeyUp);
    }
    function handleLogin() {
        var username = document.querySelector(".app-login .username").value;
        var password = document.querySelector(".app-login .password").value;
        props.aLogin(username, password);
    }

    function handleLoginResponse(response) {
        var username = document.querySelector(".app-login .username").value;
        var password = document.querySelector(".app-login .password").value;
    }

    if (props.sUser != null) {
        handleHideLogin();
    }

    var openContent;
    if (props.sOpenContent.id == "home") {
        openContent = (<Home 
                            sHome={props.sOpenContent}
                            aGetRecipe={props.aGetRecipe}
                        />);
    } else {
        openContent = (<Recipe 
                            recipe={props.sOpenContent.recipe} 
                            sUser={props.sUser}
                            aSaveRecipe={props.aSaveRecipe}
                            aAddIngredient={props.aAddIngredient}
                            aAddStep={props.aAddStep}
                            aUpdateValue={props.aUpdateValue}
                            aServerRequest={props.aServerRequest}
                        />);
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
                    <button onClick={handleLogin}>Login</button>
                </footer>
            </div>
        </section>
        <section className="app-body">
            <nav className="navigation">
                <Navigation 
                    sOpenList={props.sOpenList}
                    sUser={props.sUser}
                    aOpenContent={props.aOpenContent}
                    aNewRecipe={props.aNewRecipe}
                    aCloseRecipe={props.aCloseRecipe}
                />
            </nav>
            <div className="site-body">
                <Header 
                    sUser={props.sUser}
                    aHandleShowLogin={handleShowLogin}
                    aGetRecipe={props.aGetRecipe}
                    aServerRequest={props.aServerRequest}
                    aLogout={props.aLogout}
                />
                <main className="open-content">
                    {openContent}
                </main>
                
            </div>
        </section>
    </section>);
}

export default Body;


/*
// TODO: Might be worth investigating why i cant use a normal lass in here and the container
var Body = React.createClass({   
    handleShowLogin: function() {
        document.querySelector(".app-login").classList.add("show");
        document.querySelector(".app-body").classList.add("hide");
    },
    handleHideLogin: function() {
        document.querySelector(".app-login").classList.add("hide");
        document.querySelector(".app-body").classList.add("show");

        document.querySelector(".app-login").classList.remove("show");
        document.querySelector(".app-body").classList.remove("hide");

        setTimeout(function() {
            document.querySelector(".app-login").classList.remove("hide");
            document.querySelector(".app-body").classList.remove("show");
        }, 1500) 
    },
    handleLogin: function() {
        var username = document.querySelector(".app-login .username").value;
        var password = document.querySelector(".app-login .password").value;
        this.props.aLogin(username, password);
    },
    render: function() {
        var openContent;
        if (this.props.sOpenContent.id == "home") {
            openContent = (<Home 
                                sHome={this.props.sOpenContent}
                                aGetRecipe={this.props.aGetRecipe}
                            />);
        } else {
            openContent = (<Recipe 
                                recipe={this.props.sOpenContent.recipe} 
                                aSaveRecipe={this.props.aSaveRecipe}
                                aAddIngredient={this.props.aAddIngredient}
                                aAddStep={this.props.aAddStep}
                                aUpdateValue={this.props.aUpdateValue}
                                aServerRequest={this.props.aServerRequest}
                            />);
        }

        return (<section className="app">
            <section className="app-login">
                <div className="app-login-inner">
                    <header>
                        <label>Login</label><a className="ti-close" onClick={this.handleHideLogin}/>
                    </header>
                    <div className="app-login-form">
                        <input placeholder="Username" className="username" type="text"/>
                        <input placeholder="Password" className="password" type="password"/>
                    </div>
                    <footer>
                        <button onClick={this.handleLogin}>Login</button>
                    </footer>
                </div>
            </section>
            <section className="app-body">
                <nav className="navigation">
                    <Navigation 
                        sOpenList={this.props.sOpenList}
                        aOpenContent={this.props.aOpenContent}
                        aNewRecipe={this.props.aNewRecipe}
                        aCloseRecipe={this.props.aCloseRecipe}
                    />
                </nav>
                <div className="site-body">
                    <Header 
                        aHandleShowLogin={this.handleShowLogin}
                        aGetRecipe={this.props.aGetRecipe}
                        aServerRequest={this.props.aServerRequest}
                    />
                    <main className="open-content">
                        {openContent}
                    </main>
                    
                </div>
            </section>
        </section>);
    }
});

export default Body;
 */