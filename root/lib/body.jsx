require("../style/main.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/header.jsx';
import Navigation from '../components/navigation.jsx';
import Recipe from '../components/recipe.jsx';
import Home from '../components/home.jsx';
import Authentication from '../components/authentication.jsx';

var Body = React.createClass({ 
    appAuthenticate: null,
    appBody: null,  
    getInitialState: function() {
        return {
            showLogin: false,
            showRegister: false
        }
    },
    componentDidMount: function() {
        this.appAuthenticate = ReactDOM.findDOMNode(this).querySelector(".app-authenticate");
        this.appBody = ReactDOM.findDOMNode(this).querySelector(".app-body");
    }, 
    componentDidUpdate: function() {
        if (this.props.sAuthenticate.active) {
            this.appAuthenticate.classList.add("show");
            this.appBody.classList.add("hide");
        } else {
            // Reverse the animation delay
            this.appAuthenticate.classList.add("hide");
            this.appBody.classList.add("show");

            // Pull off classes that animate 
            this.appAuthenticate.classList.remove("show");
            this.appBody.classList.remove("hide");

            // Clean up when animations are finished
            var self = this;
            setTimeout(function() {
                self.appAuthenticate.classList.remove("hide");
                self.appBody.classList.remove("show");
            }, 1000);           
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
            <section className="app-authenticate">
                <Authentication
                    sAuthenticate={this.props.sAuthenticate}
                    aAuthenticate={this.props.aAuthenticate}
                    aRegister={this.props.aRegister}
                    aLogin={this.props.aLogin}
                />
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
                        aAuthenticate={this.props.aAuthenticate}
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