import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check';

const styles = (theme) => ({
  stepAvatar: {
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'all .5s',
    marginRight: theme.spacing(2),
    '&[data-selected=true]': {
      backgroundColor: theme.palette.primary.main,
    },
    '&:hover': {
      border: '2px solid black',
    },
  },
});
function ItemAvatar(props) {
  const { classes, selected, disabled, update, label, width, height } = props;
  let avatarContent = label;
  const style = {
    width,
    height,
  };

  if (disabled) {
    return <Avatar style={style}>{avatarContent}</Avatar>;
  }

  if (selected) {
    avatarContent = (
      <Check
        style={{
          width: width - 2,
          height: height - 2,
        }}
      />
    );
  }

  return (
    <Avatar
      className={classes.stepAvatar}
      style={style}
      data-selected={selected}
      onClick={update}
    >
      {avatarContent}
    </Avatar>
  );
}

ItemAvatar.defaultProps = {
  width: 25,
  height: 25,
};

export default withStyles(styles)(ItemAvatar);
