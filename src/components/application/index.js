import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../lib/actions';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Header from '../header';
import Sidebar from '../sidebar';
import Home from '../home';

const styles = theme => ({
    root: {
        display: 'flex',
    }    
});

class Application extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(RecipeActions.getDataRecentFeed());
        this.toggleNav = this.toggleNav.bind(this);
    }
    toggleNav()  {
        this.props.dispatch(SiteActions.toggleSidebar());
    };
    render() {
        const { classes } = this.props;
        return (
            <div  className={classes.root}>
                <Header open={this.props.site.showNav} toggleNav={this.toggleNav}/>
                <Sidebar open={this.props.site.showNav} toggleNav={this.toggleNav}/>
                <Home recipe={this.props.recipe}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Application));
