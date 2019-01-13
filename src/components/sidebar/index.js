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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeOutlined from '@material-ui/icons/HomeOutlined'
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
    }
});

class Sidebar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Drawer variant="permanent" open={this.props.open}
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: this.props.open,
                    [classes.drawerClose]: !this.props.open,
                })}
                classes={{
                    paper: classNames({
                    [classes.drawerOpen]: this.props.open,
                    [classes.drawerClose]: !this.props.open,
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
                    <ListItem button>
                        <ListItemIcon><HomeOutlined/></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><Add/></ListItemIcon>
                        <ListItemText primary="New recipe" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {['All mail'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Sidebar);
