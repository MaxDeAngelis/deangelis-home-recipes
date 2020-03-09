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
        
        this.saveRecipe = this.saveRecipe.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.closeRecipe = this.closeRecipe.bind(this);
    }
    saveRecipe(recipe) {
        this.props.dispatch(RecipeActions.save(recipe));
    }
    updateValue(id, key, value) {
        this.props.dispatch(RecipeActions.updateValue(id, key, value));
    }
    closeRecipe(id) {
        this.props.dispatch(RecipeActions.close(id));
    }
    render() {
        const { classes } = this.props;
        let content = <Home/>;
        this.props.site.nav.items.forEach((item) => {
            if (item.selected) {
                if (item.category === "RECIPE" /*|| item.id === "new"*/) {
                    let recipes = this.props.recipe.open.filter((recipe) => recipe.id === item.id)
                    content = <Recipe 
                                data={recipes[0]} 
                                close={this.closeRecipe} 
                                saveRecipe={this.saveRecipe}
                                updateValue={this.updateValue}
                                availableIngredients={this.props.recipe.ingredients}
                                availableUnits={this.props.recipe.units}
                            />;
                } else if (item.id === "search") {
                    content = <Search/>
                }
            }
        })
        return (
            <div  className={classes.root}>
                <Header />
                <Sidebar/>
                {content}
                <Login/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Application));
