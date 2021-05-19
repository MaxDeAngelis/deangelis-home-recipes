import React, { useState } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { SiteActions, RecipeActions } from '../../Lib/actions';

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingRight: 24,
  },
  appBarShift: {
    marginLeft: theme.overrides.drawerWidth,
    width: `calc(100% - ${theme.overrides.drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 4,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 300,
      },
    },
  },
});

function Header(props) {
  const { user, nav, classes, dispatch } = props;
  const [search, setSearch] = useState('');

  function handleUpdate(e) {
    setSearch(e.target.value);

    dispatch(RecipeActions.search(e.target.value));
    dispatch(SiteActions.openContent('search', 'SITE'));
  }
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatch(RecipeActions.search(search));
      dispatch(SiteActions.openContent('search', 'SITE'));
    }
  }

  let loginOrOut = (
    <Button color="inherit" onClick={() => dispatch(SiteActions.toggleLogin())}>
      Login
    </Button>
  );
  if (user) {
    loginOrOut = (
      <Button color="inherit" onClick={() => dispatch(SiteActions.logout())}>
        Logout
      </Button>
    );
  }

  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: nav.open,
      })}
    >
      <Toolbar className={classes.toolbar} disableGutters={!nav.open}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => dispatch(SiteActions.toggleSidebar())}
          className={classNames(classes.menuButton, {
            [classes.hide]: nav.open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          DeAngelis Home Recipes
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{ root: classes.inputRoot, input: classes.inputInput }}
            value={search}
            onChange={handleUpdate}
            onKeyPress={handleKeyPress}
          />
        </div>
        {loginOrOut}
      </Toolbar>
    </AppBar>
  );
}

function mapStateToProps(state) {
  return state.site;
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Header)
);
