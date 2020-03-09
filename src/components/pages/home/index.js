import React from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../../lib/actions';

import Recents from '../../recents';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar
});

function Home(props) {
    const { site, recipe, classes, dispatch } = props;
    let welcome = <Typography variant="h4" align="center">Welcome to DeAngelis Home!</Typography>
    if (site.user) {
        welcome = <Typography variant="h4" align="center">Welcome back {site.user.firstName + " " + site.user.lastName}</Typography>
    }
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {welcome}
            <Recents recipes={recipe.recents} openRecipe={(id) => dispatch(RecipeActions.open(id))}/>
        </main>
    );
}


function mapStateToProps(state) {
    return {site : state.site, recipe : state.recipe}
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
