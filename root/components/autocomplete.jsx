import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/autocomplete.scss");

var AutoComplete = React.createClass({
    getInitialState: function () {
      return {
        fullList: this.props.source,
        filteredList: [],
        searchTerms: []
      };
    },
    getItemHTML: function(item) {
      var itemHTML = item;
      var whereToStart = 0;
      
      for (var x = 0; x < this.state.searchTerms.length; x++) {
          var term = this.state.searchTerms[x];
          if (term == "") continue;
          var replacement = "";
          var regExObj = this.getRegExObj(term);
          var match = itemHTML.substring(whereToStart, itemHTML.length).match(regExObj);
          var beforeString = itemHTML.substring(0, whereToStart);
          var afterString = itemHTML.substring(whereToStart, itemHTML.length);

          if (match != null) { 
              replacement = "<span class='highlight'>" + match[0] + "</span>";
              whereToStart += match.index + replacement.length;
          }

          itemHTML = beforeString + afterString.replace(regExObj, replacement);          
      }
      return { __html: itemHTML };
    },
    getRegExObj: function(searchRegEx) {
      var returnObj = null;
      try {
          returnObj = new RegExp(searchRegEx, "i");
      } catch (e) { }
      return returnObj;
    },
    resize: function() {
      var results = ReactDOM.findDOMNode(this).querySelector(".results");
      var componentPos = ReactDOM.findDOMNode(this).getBoundingClientRect()
      var pos = results.getBoundingClientRect();
      results.style.maxHeight = (window.innerHeight - pos.top) + "px";
      results.style.top = componentPos.height + "px";
    },
    change: function(e) {
      var value = ReactDOM.findDOMNode(this).querySelector("input").value;
      var results = ReactDOM.findDOMNode(this).querySelector(".results");

      var searchTerms = value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&").split(" ");
      var searchRegExString = ""
      for (var i = 0; i < searchTerms.length; i++) {
          searchRegExString += searchTerms[i] + ".*";
      }

      var regExObj = this.getRegExObj(searchRegExString);
      
      var filteredList = [];
      if (regExObj !== null) {
          for (var x = 0; x < this.state.fullList.length; x++) {
              var currentItem = this.state.fullList[x];
              if (regExObj.test(currentItem)) {
                  filteredList.push(currentItem);
              }
          }
      } else {
          filteredList = this.state.fullList.slice(0);
      }

      this.setState({ filteredList: filteredList, fullList: this.props.source, searchTerms: searchTerms});

      this.resize();
      this.props.change(e);
    },
    focus: function(e) {
      this.change(e);

      window.addEventListener("scroll", this.resize, true);
      window.addEventListener("resize", this.resize, false);

      ReactDOM.findDOMNode(this).querySelector(".results").classList.add("show");
    },
    blur: function(e) {
      window.removeEventListener("scroll", this.resize, true);
      window.removeEventListener("resize", this.resize, false);

      ReactDOM.findDOMNode(this).querySelector(".results").classList.remove("show");
    },
    select: function(e) {
      ReactDOM.findDOMNode(this).querySelector("input").value = e.target.innerText;
      e.target = ReactDOM.findDOMNode(this).querySelector("input");
      this.change(e);
    },
    render: function() {
      var me = this;
      var key = -1;
      var list = this.state.filteredList.map(function (item) {
        return (<div key={key++} className="item" 
                    onClick={me.select}
                    dangerouslySetInnerHTML={me.getItemHTML(item)}>
                </div>)
      });

      return(<div className="autocomplete">
                <input value={this.props.value}
                  placeholder={this.props.placeholder}
                  onChange={this.change}
                  onFocus={this.focus}
                  onBlur={this.blur}>
                </input>
                <div className="results">{list}</div>
            </div>);
    }
});

export default AutoComplete;
