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
    scrollIntoView: function(selector) {
        var time = this;        
        var results = ReactDOM.findDOMNode(this).querySelector(".results");
        results.querySelector(selector).scrollTop = 0;
        setTimeout(function() {
            var resultsPos = results.getBoundingClientRect();
            
            var active = results.querySelector(selector + " .item.active").getBoundingClientRect();
            if (active.top > resultsPos.bottom) {
                var scrollDiff = active.top - resultsPos.top;
                time.scrollTo(results.querySelector(selector), scrollDiff, 1000);
            }
        }, 500)
    },
    scrollTo: function(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;
        var me = this;
    
        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            me.scrollTo(element, to, duration - 10);
        }, 10);
    },
    dismiss: function(e, skip) {
        var current = e.target;
        while (current != null) {
            if (current == ReactDOM.findDOMNode(this).querySelector(".results")) {
                return false;
            }
            current = current.parentNode;
        }

        window.removeEventListener("click", this.dismiss, true);        
        ReactDOM.findDOMNode(this).classList.remove("show");        
    },
    focus: function (e) {
        var time = this;
        setTimeout(function() {
            window.addEventListener("click", time.dismiss, true);            
        }, 500)
        ReactDOM.findDOMNode(this).classList.add("show");

        this.scrollIntoView(".hours");
        this.scrollIntoView(".minutes");        
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
    
        this.props.update(value.join(":"));                
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
