import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/notify.scss");

var Notify = React.createClass({ 
    timer: null,
    componentDidMount: function() {
        this.handleLoad();
    },
    componentDidUpdate: function() {
        this.handleLoad();
    },
    handleLoad: function() {
        if (this.props.sNotify.active && this.props.sNotify.timer != null) {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.handleHide, this.props.sNotify.timer + 500);
        }
    },
    handleHide: function() {
        this.props.aNotify(false, null, null, this.props.sNotify.timer);
    },
    render: function() {
        var outerClasses = "app-notify";
        if (this.props.sNotify.active){
            outerClasses += " show";
        }

        var close = "";
        if (this.props.sNotify.timer == null) {
            close = <a className="ti-close" onClick={this.handleHide}/>;
        }
        var message = <p>{this.props.sNotify.message}</p>
        if (typeof this.props.sNotify.message == "object") {
            message = this.props.sNotify.message
        }

        var contentClasses = "notify-content " + this.props.sNotify.type;
        return (<div className={outerClasses}>
            <div className={contentClasses}>
                <div className="notify-message">
                    {close}
                    {message}
                </div>
            </div>
        </div>);
    }
});

export default Notify;