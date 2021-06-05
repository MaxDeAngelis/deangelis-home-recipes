import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { RecipeActions } from '../../Lib/actions';

import Recents from '../../Components/Recents';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});

function Home(props) {
  const { site, recipe, classes, dispatch } = props;
  let welcome = (
    <Typography variant="h4" align="center" data-testid="home-welcome-message">
      Welcome to DeAngelis Home!
    </Typography>
  );
  if (site.user) {
    welcome = (
      <Typography
        variant="h4"
        align="center"
        data-testid="home-welcome-message"
      >
        {`Welcome back ${site.user.firstName} ${site.user.lastName}`}
      </Typography>
    );
  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {welcome}
      <Recents
        recipes={recipe.recents}
        openRecipe={(id) => dispatch(RecipeActions.open(id))}
      />
    </main>
  );
}

function mapStateToProps(state) {
  return { site: state.site, recipe: state.recipe };
}

export default connect(mapStateToProps)(withStyles(styles)(Home));
