import React from 'react';
import ReactDOM from 'react-dom';

require("../style/components/home.scss");

var Home = React.createClass({   
    handleClick: function(e){
        var recipe = e.target;
        
        while (recipe && !recipe.classList.contains("recipe")) {
            recipe = recipe.parentNode;
        }
        
        this.props.aGetRecipe(recipe.dataset.id);
    }, 
    render: function() {
        var home = this;
        var recentFeed = this.props.sHome.recentFeed.map(function(recipe) {
            // Split timestamp into [ Y, M, D, h, m, s ]
            var time = recipe.dateCreated.split(/[- :]/);
            // Apply each element to the Date function
            var created = new Date(Date.UTC(time[0], time[1]-1, time[2], time[3], time[4], time[5]));

            return (<div className="recipe" key={recipe.id} data-id={recipe.id} onClick={home.handleClick}>
                <div className="title">{recipe.title}</div>
                <img src={recipe.picture}/>
                <div className="additional-info">
                    <span className="author">{recipe.firstName + " " + recipe.lastName}</span>
                    <span className="creation-date">({created.toDateString()})</span>
                </div>
            </div>)
        });


        return ( <main className="home-content">
                <h1 className="site-title">DeAngelis Home Recipes</h1>
                <div className="recent-wrapper">
                    <h2 className="recent-title">Recently Entered Recipes</h2>
                    <div className="recent-feed">{recentFeed}</div>
                </div>
            </main>
        );
    }
});

export default Home;
