import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../../lib/actions';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Header from '../../header';
import Sidebar from '../../sidebar';
import Login from '../../login';

import Home from '../home';
import Recipe from '../recipe';
import Search from '../search';

const styles = theme => ({
    root: {
        display: 'flex',
    }    
});

class Application extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(RecipeActions.getRecents());
        this.props.dispatch(SiteActions.login("", ""));
        this.props.dispatch(RecipeActions.search(""));
        
        this.toggleNav = this.toggleNav.bind(this);
        this.search = this.search.bind(this);
        this.openContent = this.openContent.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.openRecipe = this.openRecipe.bind(this);
        this.closeRecipe = this.closeRecipe.bind(this);
    }
    toggleNav()  {
        this.props.dispatch(SiteActions.toggleSidebar());
    }
    search(text) {
        this.props.dispatch(RecipeActions.search(text));
        this.props.dispatch(SiteActions.openContent('search', 'SITE'));
    }
    openContent(id, category) {
        this.props.dispatch(SiteActions.openContent(id, category));
    }
    login(username, password) {
        this.props.dispatch(SiteActions.login(username, password));
    }
    logout() {
        this.props.dispatch(SiteActions.logout());
    }
    toggleLogin() {
        this.props.dispatch(SiteActions.toggleLogin());
    }
    openRecipe(id) {
        this.props.dispatch(RecipeActions.open(id));
    }
    closeRecipe(id) {
        this.props.dispatch(RecipeActions.close(id));
    }
    render() {
        const { classes } = this.props;
        let content = <Home openRecipe={this.openRecipe} site={this.props.site} recipe={this.props.recipe}/>;
        this.props.site.nav.items.forEach((item) => {
            if (item.selected) {
                if (item.category === "RECIPE") {
                    let recipes = this.props.recipe.open.filter((recipe) => recipe.id === item.id)
                    content = <Recipe data={recipes[0]} close={this.closeRecipe}/>;
                } else if (item.id === "search") {
                    content = <Search results={this.props.recipe.searchResults} openRecipe={this.openRecipe}/>
                }
            }
        })
        return (
            <div  className={classes.root}>
                <Header 
                    open={this.props.site.nav.open} 
                    user={this.props.site.user} 
                    toggleNav={this.toggleNav} 
                    search={this.search} 
                    toggleLogin={this.toggleLogin}
                    logout={this.logout}
                />
                <Sidebar nav={this.props.site.nav} toggleNav={this.toggleNav} openRecipes={this.props.recipe.open} openContent={this.openContent}/>
                {content}
                <Login open={this.props.site.loginOpen} login={this.login} toggleLogin={this.toggleLogin}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Application));
