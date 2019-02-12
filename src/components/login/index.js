import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    }
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleUpdate(key, value) {
        var state = this.state;

        state[key] = value;
        this.setState(state);
    }
    handleLogin() {
        this.props.login(this.state.username, this.state.password)
    }
    render() {
        const { classes } = this.props;
        return (
            <div  className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    PaperProps={{className:classes.dialog}}
                >
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter username and password to login
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="username"
                            label="Username"
                            fullWidth
                            value={this.state.username}
                            inputProps={{className: classes.input}}
                            onChange={(e) => this.handleUpdate('username', e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            variant="outlined"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            value={this.state.password}
                            inputProps={{className: classes.input}}
                            onChange={(e) => this.handleUpdate('password', e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={this.props.toggleLogin}>
                            Cancel
                        </Button>
                        <Button variant="outlined" onClick={this.handleLogin}>
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Login);
