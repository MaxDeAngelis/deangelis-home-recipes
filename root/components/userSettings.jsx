import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/userSettings.scss");

var UserSettings = React.createClass({   
    _getUserId: function(e) {
        var currentElement = e.target;
        var userName;
        while (currentElement != null) {
            if (currentElement.classList.contains("item")) {
                console.log(currentElement);
                console.log(currentElement.dataset.userid);
                return currentElement.dataset.userid;
                break;
            }
            currentElement = currentElement.parentNode;
        }
    },
    accept: function(e) {
        this.props.aUpdateUserStatus(this._getUserId(e), "pending");
    },
    decline: function(e) {
        this.props.aUpdateUserStatus(this._getUserId(e), "deleted");
    },
    render: function() {
        var setting = this;
        var admin;
        if (this.props.sUser.roleType == "admin") {
            var requests = this.props.sUser.requests.map(function(user) {
                return (<li key={user.userId} className="item" data-userid={user.userId}>
                    <span className="name">{user.firstName + " " + user.lastName}</span>
                    <span className="info">({user.userName + " - " + user.email})</span>
                    <span className="controls">
                        <button className="accept" onClick={setting.accept}>Accept</button>
                        <button className="reject" onClick={setting.decline}>Reject</button>
                    </span>
                </li>);
            });

            admin = (<div>
                <h2>Current requests</h2>
                <ul className="request-list">
                    {requests}   
                </ul> 
            </div>);
        } 

        return ( <main className="settings-content">
                <h1 className="content-title">User Settings</h1>
                {admin}
            </main>
        );
    }
});

export default UserSettings;
