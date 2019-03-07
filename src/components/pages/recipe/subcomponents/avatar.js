import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check'

const styles = theme => ({
    stepAvatar: {
        cursor: 'pointer',
        border: '2px solid transparent',
        transition: 'all .5s',
        '&[data-selected=true]': {
            backgroundColor: theme.palette.primary.main
        },
        '&:hover': {
            border: '2px solid black'
        }
    }
});

class ItemAvatar extends React.Component {
    render() {
        const {classes} = this.props;
        let avatarContent = this.props.label;
        let style = {
            width: this.props.width,
            height: this.props.height
        }
        if (this.props.disabled) {
            return (
                <Avatar 
                    style={style}
                >
                    {avatarContent}
                </Avatar>
            );
        } else {
            if (this.props.selected) {
                avatarContent = <Check style={{
                    width: this.props.width - 2,
                    height: this.props.height - 2
                }}/>;
            }
            return (
                <Avatar 
                    className={classes.stepAvatar} 
                    style={style}
                    data-selected={this.props.selected} 
                    onClick={this.props.update}
                >
                    {avatarContent}
                </Avatar>
            );
        }
    }
}

ItemAvatar.defaultProps = {
    width: 25,
    height: 25
};

export default withStyles(styles)(ItemAvatar);