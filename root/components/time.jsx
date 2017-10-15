import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/time.scss");

var Time = React.createClass({
    getInitialState: function () {
        var parsed = this.props.value.split(":");
        var state = {
            selectedHour: parsed[0],
            selectedMinute: parsed[1],
            hourList: [],
            minuteList: []
        };

        for (var i = 0; i <= 24; i++) {
            var value = (i<10?"0"+i:i);
            state.hourList.push(value.toString());
        }

        for (var i = 0; i < 60; i++) {
            var value = (i<10?"0"+i:i);
            state.minuteList.push(value.toString());
        }
        return state;
    },
    dismiss: function(e, skip) {
       //if (skip === true) {
            var current = e.target;
            while (current != null) {
                if (current == ReactDOM.findDOMNode(this)) {
                    return false;
                }
                current = current.parentNode;
            }
        //}

        window.removeEventListener("click", this.dismiss, true);        
        ReactDOM.findDOMNode(this).querySelector(".results").classList.remove("show");        
    },
    focus: function (e) {

        ReactDOM.findDOMNode(this).querySelector(".results .hours .item.active").scrollIntoView({block: 'center', behavior: 'smooth'});
        ReactDOM.findDOMNode(this).querySelector(".results .minutes .item.active").scrollIntoView({block: 'center', behavior: 'smooth'});
        

        window.addEventListener("click", this.dismiss, true);
        ReactDOM.findDOMNode(this).querySelector(".results").classList.add("show");
    },
    select: function (e, state) {
        var input = ReactDOM.findDOMNode(this).querySelector("input")
        var value = ["00", "00"];
        if (state.selectedHour != null) {
            value[0] = state.selectedHour;
        }
        if (state.selectedMinute != null) {
            value[1] = state.selectedMinute;
        }
        input.value = value.join(":");
        if (state.selectedHour != null && state.selectedMinute != null) {
            this.props.update(value.join(":"));
            this.dismiss(e, true);
        }
        this.setState(state);
    },
    selectMinute: function(e) {
        var state = {
            selectedHour: this.state.selectedHour,
            selectedMinute: e.target.innerText
        }

        this.select(e, state);        
    },
    selectHour: function(e) {
        var state = {
            selectedHour: e.target.innerText,
            selectedMinute: this.state.selectedMinute
        }

        this.select(e, state);        
    },
    render: function() {
        var me = this;
        var hours = this.state.hourList.map(function (item) {
            var itemClass = "item";
            var scroll = false;
            if (item == me.state.selectedHour) {
                itemClass += " active";
                scroll = true;
            }
            return (<li key={item} className={itemClass} onClick={me.selectHour}>{item}</li>)
        });
        var minutes = this.state.minuteList.map(function (item) {
            var itemClass = "item";
            var scroll = false;            
            if (item == me.state.selectedMinute) {
                itemClass += " active";
                scroll = true;                
            }
            return (<li key={item} className={itemClass} onClick={me.selectMinute}>{item}</li>)
        });
        var customClass = "time-picker " + this.props.customClass;
        var value = <span>{this.props.value}</span>;
        if (this.props.editable) {
            value = <input readOnly="true"
                        value={this.props.value}
                        onFocus={this.focus}
                    />;
        }
        return(<div className={customClass}>
            {value}
            <div className="results">
                <ul className="hours">{hours}</ul>
                <ul className="minutes">{minutes}</ul>
            </div>
        </div>);
    }
});

export default Time;
