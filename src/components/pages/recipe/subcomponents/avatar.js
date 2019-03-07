import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check'

const styles = theme => ({
    stepAvatar: {
        width: 25,
        height: 25,
    },
    stepAvatarEnabled: {
        width: 25,
        height: 25,
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all .5s',
        '&[data-selected=true]': {
            backgroundColor: theme.palette.primary.main
        },
        '&:hover': {
            border: '2px solid black'
        }
    },
    stepAvatarCheck: {
        width: 20,
        height: 20,
    }
});

class ItemAvatar extends React.Component {
    render() {
        const {classes} = this.props;
        let avatarContent = this.props.label;
        if (this.props.disabled) {
            return (
                <Avatar 
                    className={classes.stepAvatar} 
                >
                    {avatarContent}
                </Avatar>
            );
        } else {
            if (this.props.selected) {
                avatarContent = <Check className={classes.stepAvatarCheck}/>;
            }
            return (
                <Avatar 
                    className={classes.stepAvatarEnabled} 
                    data-selected={this.props.selected} 
                    onClick={this.props.update}
                >
                    {avatarContent}
                </Avatar>
            );
        }
    }
}

export default withStyles(styles)(ItemAvatar);