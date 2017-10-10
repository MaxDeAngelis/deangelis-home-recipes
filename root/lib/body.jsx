require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';
import Home from '../components/home.jsx';

var Body = React.createClass({ 
    appLogin: null,
    appBody: null,  
    componentDidMount: function() {
        this.appLogin = ReactDOM.findDOMNode(this).querySelector(".app-login");
        this.appBody = ReactDOM.findDOMNode(this).querySelector(".app-body");
    },
    handleShowLogin: function() {
        this.appLogin.classList.add("show");
        this.appBody.classList.add("hide");

        this.appLogin.querySelector(".username").focus();
        window.addEventListener("keyup", this.handleKeyUp);
    },
    handleHideLogin: function() {
        if (this.appLogin && this.appBody) {
            // Reverse the animation delay
            this.appLogin.classList.add("hide");
            this.appBody.classList.add("show");

            // Pull off classes that animate 
            this.appLogin.classList.remove("show");
            this.appBody.classList.remove("hide");

            // Clean up when animations are finished
            var self = this;
            setTimeout(function() {
                self.appLogin.classList.remove("hide");
                self.appBody.classList.remove("show");
            }, 1500);
        } 
        window.removeEventListener("keyup", this.handleKeyUp);
    },
    handleLogin: function() {
        var username = this.appLogin.querySelector(".username").value;
        var password = this.appLogin.querySelector(".password").value;
        this.props.aLogin(username, password, this.handleLoginCallback);
    },
    handleLoginCallback: function(response) {
        if (response != null) {
            this.handleHideLogin();
        }
    },
    handleKeyUp: function(e) {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
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
                                sUser={this.props.sUser}
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
                        sUser={this.props.sUser}
                        aOpenContent={this.props.aOpenContent}
                        aNewRecipe={this.props.aNewRecipe}
                        aCloseRecipe={this.props.aCloseRecipe}
                    />
                </nav>
                <div className="site-body">
                    <Header 
                        sUser={this.props.sUser}
                        aHandleShowLogin={this.handleShowLogin}
                        aGetRecipe={this.props.aGetRecipe}
                        aServerRequest={this.props.aServerRequest}
                        aLogout={this.props.aLogout}
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