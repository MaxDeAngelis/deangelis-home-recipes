import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { SiteActions } from '../../Lib/actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    dialog : {
        backgroundColor : '#e2e2e2',
        borderRadius : 0
    },
    input : {
        borderRadius : 4
    },
    error : {
        backgroundColor: theme.palette.error.light,
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(1)
    }
});

function Login(props) {
    const { classes, loginOpen, loginEerror, dispatch } = props;
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div  className={classes.root}>
            <Dialog
                open={loginOpen}
                onClose={() => dispatch(SiteActions.toggleLogin())}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        dispatch(SiteActions.login(user, password));
                    }
                }}
                PaperProps={{className:classes.dialog}}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    {loginEerror !== "" ? <DialogContentText className={classes.error}>{loginEerror}</DialogContentText> : null }
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        id="username"
                        label="Username"
                        fullWidth
                        value={user}
                        inputProps={{className: classes.input}}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        variant="outlined"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        inputProps={{className: classes.input}}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => dispatch(SiteActions.toggleLogin())}>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={() => dispatch(SiteActions.login(user, password))}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapStateToProps(state) {
    return state.site;
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Login));
