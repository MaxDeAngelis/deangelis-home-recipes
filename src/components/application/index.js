import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../lib/actions';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Header from '../header';
import Sidebar from '../sidebar';
import Home from '../home';
import Recipe from '../recipe';

const styles = theme => ({
    root: {
        display: 'flex',
    }    
});

class Application extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(RecipeActions.getRecents());
        this.toggleNav = this.toggleNav.bind(this);
        this.search = this.search.bind(this);
    }
    toggleNav()  {
        this.props.dispatch(SiteActions.toggleSidebar());
    }
    search() {
        this.props.dispatch(RecipeActions.search());
    }
    render() {
        const { classes } = this.props;
        let content = <Home/>;
        this.props.recipe.open.forEach((item) => {
            if (item.selected) {
                content = <Recipe data={item.recipe}/>;
            }
        })
        return (
            <div  className={classes.root}>
                <Header open={this.props.site.nav.open} toggleNav={this.toggleNav} search={this.search}/>
                <Sidebar nav={this.props.site.nav} toggleNav={this.toggleNav} openRecipes={this.props.recipe.open}/>
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Application));
