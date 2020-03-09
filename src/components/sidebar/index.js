import React from 'react';
import { connect } from 'react-redux';
import { SiteActions, RecipeActions } from '../../lib/actions';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// ICONS
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add'

const styles = theme => ({
    drawer: {
        width: theme.overrides.drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: theme.overrides.drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    itemText: {
        padding: 0
    },
    itemTextOverflow: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    recipeIcon: {
        width: 24,
        height: 24
    }
});

function Sidebar(props) {
    const { site, openRecipes, classes, dispatch } = props;
    const siteIcons = site.nav.items.filter(item => item.category === "SITE");
    const recipeIcons = site.nav.items.filter(item => item.category === "RECIPE");

    const recipeItems = recipeIcons.map((item) => {
        let recipe;
        for (var i = 0; i < openRecipes.length; i++) {
            recipe = openRecipes[i];
            if (recipe.id === item.id) {
                break;
            }
        }
        
        return (
            <ListItem button key={recipe.title} selected={item.selected} onClick={() => dispatch(SiteActions.openContent(item.id, "RECIPE"))}>
                <ListItemIcon><img src={recipe.picture} className={classes.recipeIcon} alt={recipe.title}/></ListItemIcon>
                <ListItemText 
                    primary={recipe.title} 
                    className={classes.itemText} 
                    primaryTypographyProps={{className: classes.itemTextOverflow}}
                    title={recipe.title}/>
            </ListItem>
        )
    })
    
    return (
        <Drawer variant="permanent" open={site.nav.open}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: site.nav.open,
                [classes.drawerClose]: !site.nav.open,
            })}
            classes={{
                paper: classNames({
                [classes.drawerOpen]: site.nav.open,
                [classes.drawerClose]: !site.nav.open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={() => dispatch(SiteActions.toggleSidebar())}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            <Divider />
            <List>
                {siteIcons.map((item) => {
                    let icon;
                    let action = () => dispatch(SiteActions.openContent(item.id, "SITE"))
                    if (item.id === "home") {
                        icon = <HomeOutlined/>;
                    } else if (item.id === "search") {
                        icon = <SearchIcon/>;
                    } else if (item.id === "new") {
                        icon = <Add/>;
                        action = () => dispatch(RecipeActions.new())
                    }
                    return (
                        <ListItem button key={item.title} selected={item.selected} onClick={action}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={item.title} className={classes.itemText}/>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
            <List>
                {recipeItems}
            </List>
        </Drawer>
    );
}

function mapStateToProps(state) {
    return {
        site : state.site, 
        openRecipes : state.recipe.open
    }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Sidebar));
