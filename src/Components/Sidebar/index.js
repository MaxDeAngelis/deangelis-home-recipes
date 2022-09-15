import React from 'react';
import { connect } from 'react-redux';

import { styled } from '@material-ui/styles';

// COMPONENTS
import {
  Drawer,
  List,
  Grid,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

// ICONS
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import { SiteActions, RecipeActions } from '../../Lib/actions';

const StyledDrawer = styled(Drawer)(({ theme, open }) => {
  const returnedStyle = {
    width: theme.overrides.drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
  if (!open) {
    returnedStyle.overflowX = 'hidden';
    returnedStyle.width = theme.spacing(7) + 1;
  }

  // Apply same style to child paper
  return {
    ...returnedStyle,
    '& .MuiDrawer-paper': returnedStyle,
  };
});

const StyledToolbar = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 8px',
  ...theme.mixins.toolbar,
}));

const StyledItemText = styled(ListItemText)(() => ({
  padding: 0,
  '& .MuiListItemText-primary': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

function Sidebar(props) {
  const { site, openRecipes, dispatch } = props;
  const siteIcons = site.nav.items.filter((item) => item.category === 'SITE');
  const recipeIcons = site.nav.items.filter(
    (item) => item.category === 'RECIPE'
  );

  const recipeItems = recipeIcons.map((item) => {
    const recipe = openRecipes.find((openRecipe) => openRecipe.id === item.id);

    return (
      <ListItem
        button
        key={recipe.title}
        selected={item.selected}
        onClick={() => dispatch(SiteActions.openContent(item.id, 'RECIPE'))}
      >
        <ListItemIcon>
          <img
            style={{ width: '24px', height: '24ps' }}
            src={`${window.location.origin}/${recipe.picture}`}
            alt={recipe.title}
          />
        </ListItemIcon>
        <StyledItemText primary={recipe.title} title={recipe.title} />
      </ListItem>
    );
  });

  return (
    <StyledDrawer variant="permanent" open={site.nav.open}>
      <StyledToolbar>
        <IconButton onClick={() => dispatch(SiteActions.toggleSidebar())}>
          <ChevronLeftIcon />
        </IconButton>
      </StyledToolbar>
      <Divider />
      <List>
        {siteIcons.map((item) => {
          if (item.id === 'create' && !site.user) return null;
          let icon;
          let action = () => dispatch(SiteActions.openContent(item.id, 'SITE'));
          if (item.id === 'home') {
            icon = <HomeOutlined />;
            action = () => {
              dispatch(RecipeActions.getRecents());
              dispatch(SiteActions.openContent(item.id, 'SITE'));
            };
          } else if (item.id === 'search') {
            icon = <SearchIcon />;
          } else if (item.id === 'create') {
            icon = <Add />;
            action = () => dispatch(RecipeActions.new());
          }
          return (
            <ListItem
              button
              key={item.title}
              selected={item.selected}
              onClick={action}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>{recipeItems}</List>
    </StyledDrawer>
  );
}

function mapStateToProps(state) {
  return {
    site: state.site,
    openRecipes: state.recipe.open,
  };
}

export default connect(mapStateToProps)(Sidebar);
