import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../../Lib/actions';
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
    }
    render() {
        const { classes } = this.props;
        let content = <Home/>;
        this.props.site.nav.items.forEach((item) => {
            if (item.selected) {
                if (item.category === "RECIPE" /*|| item.id === "new"*/) {
                    let recipes = this.props.recipe.open.filter((recipe) => recipe.id === item.id);
                    if (recipes[0]) {
                        content = <Recipe data={recipes[0]}/>;
                    }
                } else if (item.id === "search") {
                    content = <Search/>
                }
            }
        })
        return (
            <div className={classes.root}>
                <Header/>
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
