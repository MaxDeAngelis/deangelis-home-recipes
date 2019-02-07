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
    recipeIcon: {
        width: 24,
        height: 24
    }
});

class Sidebar extends Component {
    render() {
        const { classes } = this.props;
        let homeSelected = false;
        for (let i = 0; i < this.props.nav.items.length; i++) {
            if (this.props.nav.items[i].id === "home") {
                homeSelected = true;
                break;
            }
        }
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
                    <ListItem button selected={homeSelected}>
                        <ListItemIcon><HomeOutlined/></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button >
                        <ListItemIcon><SearchIcon/></ListItemIcon>
                        <ListItemText primary="Search results" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Add/></ListItemIcon>
                        <ListItemText primary="New recipe" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {this.props.openRecipes.map((item, index) => (
                    <ListItem button key={item.recipe.id} selected={item.selected}>
                        <ListItemIcon><img src={item.recipe.picture} className={classes.recipeIcon} alt={item.recipe.title}/></ListItemIcon>
                        <ListItemText primary={item.recipe.title} />
                    </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
