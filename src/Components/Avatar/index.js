import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Check from '@material-ui/icons/Check';
import { styled } from '@material-ui/styles';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
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
}));

function ItemAvatar(props) {
  const { selected, disabled, update, label, width, height } = props;
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
    <StyledAvatar style={style} data-selected={selected} onClick={update}>
      {avatarContent}
    </StyledAvatar>
  );
}

ItemAvatar.defaultProps = {
  width: 25,
  height: 25,
};

export default ItemAvatar;
