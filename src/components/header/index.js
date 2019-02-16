import React, { Component } from 'react';

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

const styles = theme => ({
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
        paddingRight: 24
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
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
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
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
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

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search : ""
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleUpdate(e) {
        this.setState({ search: e.target.value });
        this.props.search(e.target.value);
    }
    handleKeyPress(e) {
        if (e.key === "Enter") {
            this.props.search(this.state.search);
        }
    }
    render() {
        const { classes } = this.props;
        let loginOrOut = <Button color="inherit" onClick={this.props.toggleLogin}>Login</Button>;
        if (this.props.user) {
            loginOrOut = <Button color="inherit" onClick={this.props.logout}>Logout</Button>;
        }
        return (
            <AppBar position="fixed" className={classNames(classes.appBar, { [classes.appBarShift]: this.props.open, })}>
                <Toolbar className={classes.toolbar} disableGutters={!this.props.open}>
                    <IconButton color="inherit" aria-label="Open drawer" onClick={this.props.toggleNav}
                        className={classNames(classes.menuButton, {
                            [classes.hide]: this.props.open,
                        })}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>DeAngelis Home Recipes</Typography>
                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase 
                            placeholder="Search…" 
                            classes={{root: classes.inputRoot, input: classes.inputInput}} 
                            value={this.state.search}
                            onChange={this.handleUpdate}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                    {loginOrOut}
                </Toolbar>
            </AppBar>      
        );
    }
}

export default withStyles(styles, { withTheme: true })(Header);
