import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeActions } from '../../lib/actions';
import Recents from '../recents';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.openRecipe = this.openRecipe.bind(this);
    }
    openRecipe(id) {
        this.props.dispatch(RecipeActions.open(id));
    }
    render() {
        const { classes } = this.props;
        let welcome = <Typography variant="h4" align="center">Welcome to DeAngelis Home!</Typography>
        if (this.props.site.user) {
            welcome = <Typography variant="h4" align="center">Welcome back {this.props.site.user.firstName + " " + this.props.site.user.lastName}</Typography>
        }
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {welcome}
                <Recents recipes={this.props.recipe.recents} openRecipe={this.openRecipe}/>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles)(Home));
