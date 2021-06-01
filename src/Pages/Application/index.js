import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { SiteActions, RecipeActions } from '../../Lib/actions';

// COMPONENTS
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Login from '../../Components/Login';

import Home from '../Home';
import Recipe from '../Recipe';
import Search from '../Search';

const styles = () => ({
  root: {
    display: 'flex',
  },
});

class Application extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    dispatch(RecipeActions.getRecents());
    dispatch(SiteActions.login('', ''));
    dispatch(RecipeActions.search(''));
  }

  render() {
    const { site, recipe, classes } = this.props;
    let content = <Home />;
    site.nav.items.forEach((item) => {
      if (item.selected) {
        if (item.category === 'RECIPE' /* || item.id === "new" */) {
          const recipes = recipe.open.filter(
            (openRecipe) => openRecipe.id === item.id
          );
          if (recipes[0]) {
            content = <Recipe data={recipes[0]} />;
          }
        } else if (item.id === 'search') {
          content = <Search />;
        }
      }
    });
    return (
      <div className={classes.root}>
        <Header />
        <Sidebar />
        {content}
        <Login />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Application)
);
