import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/authentication.scss");

var Authentication = React.createClass({ 
    appAuthenticateForm: null,
    getInitialState: function() {
        return {
            firstName : "", 
            lastName : "",
            username : "",
            email : "",
            emailConfirm : "",
            oldPassword : "",
            newPassword : "",
            confirmPassword : ""
        }
    },
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
            window.addEventListener("keyup", this.handleKeyUp, true);
            if (this.props.sAuthenticate.type == "reset") {
                this.appAuthenticateForm.querySelector(".username").value = this.props.sAuthenticate.user;
                this.appAuthenticateForm.querySelector(".old-password").value = this.props.sAuthenticate.key;
            }
        } else {
            window.removeEventListener("keyup", this.handleKeyUp, true);            
        }
    },
    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    validate: function(firstName, lastName, username, email, emailConfirm, oldPassword, newPassword, confirmPassword) {
        var errors = [];
        var newState =  {
            firstName : "", 
            lastName : "",
            username : "",
            email : "",
            emailConfirm : "",
            oldPassword : "",
            newPassword : "",
            confirmPassword : ""
        };

        if (firstName != null && firstName == "") {
            errors.push("First name is required");
            newState.firstName = "error ";
        }

        if (lastName != null && lastName == "") {
            errors.push("Last name is required");
            newState.lastName = "error ";
        }

        if (username != null && username == "") {
            errors.push("Username is required");
            newState.username = "error ";
        }

        if (email != null) {
            if (email == "") {
                errors.push("Email is required");
                newState.email = "error ";
            } else if (!this.validateEmail(email)) {
                errors.push("Please enter valid email");
                newState.email = "error ";
            }
        }

        if (emailConfirm != null) {
            if (emailConfirm == "") {
                errors.push("Email confirmation is required");
                newState.emailConfirm = "error ";
            } else if (!this.validateEmail(emailConfirm)) {
                errors.push("Please enter valid confirmation email");
                newState.emailConfirm = "error ";
            }
        }

        if (email != null && email != "" && emailConfirm != null && emailConfirm != "" && email != emailConfirm) {
            errors.push("Email addresses do not match");
            newState.email = "error ";
            newState.emailConfirm = "error ";
        }

        if (oldPassword != null && oldPassword == "") {
            errors.push("Password is required");
            newState.oldPassword = "error ";
        }

        if (newPassword != null && newPassword == "") {
            errors.push("New password is required");
            newState.newPassword = "error ";
        }

        if (oldPassword != null && oldPassword != "" && newPassword != null && newPassword != "" && oldPassword == newPassword) {
            errors.push("Please pick a new password");
            newState.oldPassword = "error ";
            newState.newPassword = "error ";
        }

        this.setState(newState);
        if (errors.length > 0) {
            var key = 0;
            var messageInner = errors.map(function(msg) {
                key += 1;
                return <li key={key}>{msg}</li>
            })

            var message = <div className="validation">
                <h3>Please correct flagged fields</h3>
                <ul>{messageInner}</ul>
            </div>;

            this.props.aNotify(true, "error", message, null);
            return false;
        } else {
            return true;
        }

    },
    handleHide: function() {
        var fields = [".first-name", ".last-name", ".username", ".email", ".email-confirm", ".password", ".old-password", ".new-password", ".confirm-password"];

        for (var i = 0; i < fields.length; i++) {
            var field = this.appAuthenticateForm.querySelector(fields[i]);
            if (field != null) {
                field.value = "";
            }
        }

        this.setState({
            firstName : "", 
            lastName : "",
            username : "",
            email : "",
            emailConfirm : "",
            oldPassword : "",
            newPassword : "",
            confirmPassword : ""
        });
        
        this.props.aAuthenticate(false);
    },
    handleShowRegister: function() {
        this.props.aAuthenticate(true, "register");
    },
    handleShowLogin: function() {
        this.props.aAuthenticate(true, "login");
    },
    handleLogin: function() {
        var auth = this;
        var username = this.appAuthenticateForm.querySelector(".username").value;
        var password = this.appAuthenticateForm.querySelector(".password").value;

        var callback = function(response) {
            if (response.status == "fail") {
                auth.setState({username : "error ", oldPassword: "error " });
                var message = <div className="validation">
                    <h3>An error occured durring login</h3>
                    <p>{response.message}</p>
                </div>;

                auth.props.aNotify(true, "error", message, null);
            } else {
                auth.handleHide();
            }
        }

        var isValid = this.validate(null, null, username, null, null, password, null, null);
        if (isValid) {
            this.props.aLogin(username, password, callback);
        }
    },
    handleReset: function() {
        var username = this.appAuthenticateForm.querySelector(".username").value;
        var oldPassword = this.appAuthenticateForm.querySelector(".old-password").value;
        var newPassword = this.appAuthenticateForm.querySelector(".new-password").value;
        var confirmPassword = this.appAuthenticateForm.querySelector(".confirm-password").value;

        var isValid = this.validate(null, null, username, null, null, oldPassword, newPassword, confirmPassword) 
        if (isValid) {
            this.props.aUpdatePassword(this.props.sAuthenticate.userId, oldPassword, newPassword);
        }
    },
    handleRegister: function() {
        var auth = this;
        var firstName = this.appAuthenticateForm.querySelector(".first-name").value;
        var lastName = this.appAuthenticateForm.querySelector(".last-name").value;
        var username = this.appAuthenticateForm.querySelector(".username").value;
        var email = this.appAuthenticateForm.querySelector(".email").value;
        var emailConfirm = this.appAuthenticateForm.querySelector(".email-confirm").value;

        var callback = function(response) {
            if (response.status == "fail") {
                if (response.field == "username") {
                    auth.setState({username : "error " });
                } else if (response.field == "email") {
                    auth.setState({email : "error " });
                }
                var message = <div className="validation">
                    <h3>An error occured durring registration</h3>
                    <p>{response.message}</p>
                </div>;

                auth.props.aNotify(true, "error", message, null);
            } else {
                auth.handleHide();
                
                var message = <div className="validation">
                    <h3>Thank you for registering</h3>
                    <p>An administrator will review you registration as soon as possible. 
                        Once reviewed you will receive an email with a link to complete registration.
                    <br/><br/>
                    Thank you for your patience!</p>
                </div>;
    
                auth.props.aNotify(true, "message", message, null);
            }
        }

        var isValid = this.validate(firstName, lastName, username, email, emailConfirm, null, null, null) 
        if (isValid) {
            this.props.aRegister(firstName, lastName, username, email, callback);            
        }
    },
    handleKeyUp: function(e) {
        if (e.keyCode == 13) {
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
                    <input placeholder="First name" className={this.state.firstName + "first-name"} type="text"/>
                    <input placeholder="Last name" className={this.state.lastName + "last-name"} type="text"/>
                    <input placeholder="Username" className={this.state.username + "username"} type="text"/>
                    <input placeholder="Email" className={this.state.email + "email"} type="email"/>
                    <input placeholder="Confirm email" className={this.state.emailConfirm + " email-confirm"} type="email"/>
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
                    <input placeholder="Username" className={this.state.username + "username"} type="text" disabled={disabled}/>
                    <input placeholder="Current password" className={this.state.oldPassword + "old-password"} type="password" disabled={disabled}/>
                    <input placeholder="New password" className={this.state.newPassword + "new-password"} type="password"/>
                    <input placeholder="Confirm password" className={this.state.confirmPassword + "confirm-password"} type="password"/>
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
                    <input placeholder="Username" className={this.state.username + "username"} type="text"/>
                    <input placeholder="Password" className={this.state.oldPassword + "password"} type="password"/>
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