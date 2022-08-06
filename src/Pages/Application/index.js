import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';

import { SiteActions, RecipeActions } from '../../Lib/actions';

// COMPONENTS
import Header from '../../Components/Header';
import Sidebar from '../../Components/Sidebar';
import Login from '../../Components/Login';

import Home from '../Home';
import { Recipe, RecipeLoader } from '../Recipe';
import Search from '../Search';

class Application extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;

    dispatch(RecipeActions.getRecents());
    dispatch(SiteActions.login('', ''));
  }

  render() {
    return (
      <Grid container wrap="nowrap">
        <Header />
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="recipe" element={<RecipeLoader />}>
              <Route path=":recipeId" element={<Recipe />} />
            </Route>
            <Route path="search" element={<Search />} />
          </Routes>
        </BrowserRouter>
        <Login />
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Application);
