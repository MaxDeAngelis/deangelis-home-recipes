import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/authentication.scss");

var Authentication = React.createClass({ 
    appAuthenticateForm: null,
    componentDidMount: function() {
        this.appAuthenticateForm = ReactDOM.findDOMNode(this).querySelector(".app-authenticate-form");
        this.handleLoad();
    },
    componentDidUpdate: function() {
        this.handleLoad();
    },
    handleLoad: function() {
        if (this.props.sAuthenticate.active) {
            this.appAuthenticateForm.querySelector("input").focus();
            window.addEventListener("keyup", this.handleKeyUp);
            if (this.props.sAuthenticate.type == "reset") {
                this.appAuthenticateForm.querySelector(".username").value = this.props.sAuthenticate.user;
                this.appAuthenticateForm.querySelector(".old-password").value = this.props.sAuthenticate.key;
            }
        } else {
            window.removeEventListener("keyup", this.handleKeyUp);            
        }
    },
    handleHide: function() {
        this.props.aAuthenticate(false);
    },
    handleShowRegister: function() {
        this.props.aAuthenticate(true, "register");
    },
    handleShowLogin: function() {
        this.props.aAuthenticate(true, "login");
    },
    handleLogin: function() {
        var username = this.appAuthenticateForm.querySelector(".username").value;
        var password = this.appAuthenticateForm.querySelector(".password").value;
        this.props.aLogin(username, password, this.handleLoginCallback);
    },
    handleReset: function() {
        var username = this.appAuthenticateForm.querySelector(".username").value;
        var oldPassword = this.appAuthenticateForm.querySelector(".old-password").value;
        var newPassword = this.appAuthenticateForm.querySelector(".new-password").value;
        var confirmPassword = this.appAuthenticateForm.querySelector(".confirm-password").value;

        if (newPassword == confirmPassword) {
            this.props.aUpdatePassword(this.props.sAuthenticate.userId, oldPassword, newPassword);
        }
    },
    handleRegister: function() {
        var auth = this;
        var firstName = this.appAuthenticateForm.querySelector(".first-name").value;
        var lastName = this.appAuthenticateForm.querySelector(".last-name").value;
        var userName = this.appAuthenticateForm.querySelector(".username").value;
        var email = this.appAuthenticateForm.querySelector(".email").value;
        var emailConfirm = this.appAuthenticateForm.querySelector(".email-confirm").value;

        var callback = function() {
            auth.handleHide();
        }
        this.props.aRegister(firstName, lastName, userName, email, callback);
    },
    handleLoginCallback: function(response) {
        if (response == null) {
            // TODO: Login failed need to inform the user
        }
    },
    handleKeyUp: function(e) {
        if (e.key === 'Enter') {
            ReactDOM.findDOMNode(this).querySelector(".submit-button").click();
        }
    },
    render: function() {
        if (this.props.sAuthenticate.type == "register") {
            return (<div className="app-authenticate-inner">
                <header>
                    <label>Register</label><a className="ti-close" onClick={this.handleHide}/>
                </header>
                <div className="app-authenticate-form">
                    <input placeholder="First name" className="first-name" type="text"/>
                    <input placeholder="Last name" className="last-name" type="text"/>
                    <input placeholder="Username" className="username" type="text"/>
                    <input placeholder="Email" className="email" type="email"/>
                    <input placeholder="Confirm email" className="email-confirm" type="email"/>
                    {/*<input placeholder="Password" className="password" type="password"/>
                    <input placeholder="Confirm password" className="password-confirm" type="password"/>*/}
                </div>
                <footer>
                    <button className="submit-button" onClick={this.handleRegister}>Register</button>
                    <div className="footer-note">
                        <label>Already have an account? </label>
                        <a onClick={this.handleShowLogin}>Login</a>
                    </div>
                </footer>
            </div>);
        } else if (this.props.sAuthenticate.type == "reset") {
            var disabled = false;
            if (this.props.sAuthenticate.key != "") {
                disabled = true;
            }
            return (<div className="app-authenticate-inner">
                <header>
                    <label>Reset password</label><a className="ti-close" onClick={this.handleHide}/>
                </header>
                <div className="app-authenticate-form">
                    <input placeholder="Username" className="username" type="text" disabled={disabled}/>
                    <input placeholder="Old password" className="old-password" type="password" disabled={disabled}/>
                    <input placeholder="New password" className="new-password" type="password"/>
                    <input placeholder="Confirm password" className="confirm-password" type="password"/>
                </div>
                <footer>
                    <button className="submit-button" onClick={this.handleReset}>Reset</button>
                    <div className="footer-note">
                        <label>Already have an account? </label>
                        <a onClick={this.handleShowLogin}>Login</a>
                    </div>
                </footer>
            </div>);
        } else {
            return (<div className="app-authenticate-inner">
                <header>
                    <label>Login</label><a className="ti-close" onClick={this.handleHide}/>
                </header>
                <div className="app-authenticate-form">
                    <input placeholder="Username" className="username" type="text"/>
                    <input placeholder="Password" className="password" type="password"/>
                </div>
                <footer>
                    <button className="submit-button" onClick={this.handleLogin}>Login</button>
                    <div className="footer-note">
                        <label>Don't have an account? </label>
                        <a onClick={this.handleShowRegister}>Register</a>
                    </div>
                </footer>
            </div>);
        }
    }
});

export default Authentication;