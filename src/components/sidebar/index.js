import React, { Component } from 'react';

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

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.getRecipeItem = this.getRecipeItem.bind(this);
    }
    getRecipeItem(item, classes) {
        var recipe;
        for (var i = 0; i < this.props.openRecipes.length; i++) {
            recipe = this.props.openRecipes[i];
            if (recipe.id === item.id) {
                break;
            }
        }

        return (
            <ListItem button key={recipe.title} selected={item.selected} onClick={() => this.props.openContent(item.id, "RECIPE")}>
                <ListItemIcon><img src={recipe.picture} className={classes.recipeIcon} alt={recipe.title}/></ListItemIcon>
                <ListItemText 
                    primary={recipe.title} 
                    className={classes.itemText} 
                    primaryTypographyProps={{className: classes.itemTextOverflow}}
                    title={recipe.title}/>
            </ListItem>
        )
    }
    render() {
        const { classes } = this.props;
        let _this = this;
        let siteIcons = this.props.nav.items.filter(item => item.category === "SITE");
        let recipeIcons = this.props.nav.items.filter(item => item.category === "RECIPE");
        return (
            <Drawer variant="permanent" open={this.props.nav.open}
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.props.nav.open,
                    [classes.drawerClose]: !this.props.nav.open,
                })}
                classes={{
                    paper: classNames({
                    [classes.drawerOpen]: this.props.nav.open,
                    [classes.drawerClose]: !this.props.nav.open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.toggleNav}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {siteIcons.map((item) => {
                        let icon;
                        if (item.id === "home") {
                            icon = <HomeOutlined/>;
                        } else if (item.id === "search") {
                            icon = <SearchIcon/>;
                        } else if (item.id === "new") {
                            icon = <Add/>;
                        }
                        return (
                            <ListItem button key={item.title} selected={item.selected} onClick={() => _this.props.openContent(item.id, "SITE")}>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={item.title} className={classes.itemText}/>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider />
                <List>
                    {recipeIcons.map((item) => {
                        return _this.getRecipeItem(item, classes);
                    })}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
