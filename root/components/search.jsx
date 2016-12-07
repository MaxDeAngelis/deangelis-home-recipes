import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './recipe.jsx';
require("../style/components/search.scss");

const Search = React.createClass({
    getInitialState: function () {
        return {
            fullList: [],
            filteredList: [],
            searchTerms: []
        };
    },
    getRegExObj: function(searchRegEx) {
        var returnObj = null;
        try {
            returnObj = new RegExp(searchRegEx, "i");
        } catch (e) { }
        return returnObj;
    },
    getHighlightedTitle: function(title) {
        var titleHTML = title;
        var whereToStart = 0;
        for (var x = 0; x < this.state.searchTerms.length; x++) {
            var term = this.state.searchTerms[x];
            if (term == "") continue;
            var regExObj = this.getRegExObj(term);
            var match = titleHTML.substring(whereToStart, titleHTML.length).match(regExObj);
            var replacement = "<span class='highlight'>" + match[0] + "</span>";

            var beforeString = titleHTML.substring(0, whereToStart);
            var afterString = titleHTML.substring(whereToStart, titleHTML.length);

            titleHTML = beforeString + afterString.replace(regExObj, replacement);
            whereToStart += match.index + replacement.length;
        }
        return { __html: titleHTML };
    },
    getRecipeHTML: function (recipe) {
        return (<div className="row" key={recipe.id} data-id={recipe.id}>
            <div className="row-content" onClick={this.select}>
                <img className="image" src={recipe.picture} />
                <div className="details">
                    <div className="title" dangerouslySetInnerHTML={this.getHighlightedTitle(recipe.title)}></div>
                    <div className="author">{recipe.firstName + " " + recipe.lastName}</div>
                </div>
            </div>
        </div>);
    },
    change: function (e) {
        var searchTerms = e.target.value.split(" ");
        var searchRegExString = ""
        for (var i = 0; i < searchTerms.length; i++) {
            searchRegExString += searchTerms[i] + ".*";
        }
        var regExObj = this.getRegExObj(searchRegExString);

        var filteredList = [];
        if (regExObj !== null) {

            for (var x = 0; x < this.state.fullList.length; x++) {
                var currentRecipe = this.state.fullList[x];
                if (regExObj.test(currentRecipe.title)) {
                    filteredList.push(currentRecipe);
                }
            }
        } else {
            filteredList = this.state.fullList.slice(0);
        }

        this.setState({ filteredList: filteredList , searchTerms: searchTerms});
    },
    focus: function () {
        var me = this;
        $.get('../processAction.php',
            { action: 'GET_LIST' },
            function (response) {
                me.setState({ fullList: response.slice(0), filteredList: response.slice(0) });
                document.querySelector(".search > .results").className += " show";
            },
            "json"
        );
    },
    blur: function () {
        document.querySelector(".search > .results").className = "results";
    },
    select: function (e) {
        var element = e.target;
        while (element.className != "row") {
            element = element.parentElement;
        }
        var id = element.dataset.id;

        $.get('../processAction.php',
            {
                action: 'GET_RECIPE',
                id: id
            },
            function (response) {
                var openContent = document.querySelector(".open-content");
                ReactDOM.unmountComponentAtNode(openContent);
                ReactDOM.render(<Recipe data={response} />, openContent);
            },
            "json"
        );
    },
    render: function () {
        var key = 0;
        var me = this;
        var list = this.state.filteredList.map(function (recipe) {
            return me.getRecipeHTML(recipe);
        });

        return (<div className="search">
            <input placeholder="Search..."
                onFocus={this.focus}
                onBlur={this.blur}
                onChange={this.change}></input>
            <div className="results">{list}</div>
        </div>
        );
    }
});

export default Search;
