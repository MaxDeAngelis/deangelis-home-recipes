import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';

import { TextField, Typography, Grid, Fab } from '@material-ui/core';
import { Close, Edit, Save } from '@material-ui/icons';
import { RecipeActions } from '../../Lib/actions';

const ToolBar = styled(Grid)(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const TitleBar = styled(Grid)(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 12px',
}));

const TitleInput = styled(TextField)(() => ({
  flexGrow: 1,
  '& input': {
    fontSize: '2rem',
  },
}));

const HeaderIcon = styled(Fab)(() => ({
  marginLeft: 10,
}));

const CloseIcon = styled(HeaderIcon)(({ theme }) => ({
  ...theme.mixins.cancel,
}));

function RecipeHeader(props) {
  const { data, editable, userLoggedIn, dispatch } = props;
  const titleRef = useRef(null);
  const [focusOnEdit, setFocusOnEdit] = useState(true);

  useEffect(() => {
    if ((focusOnEdit || data.id === -1) && titleRef && titleRef.current) {
      titleRef.current.focus();
    }
    setFocusOnEdit(false);
  }, [data.id, editable, focusOnEdit, titleRef]);

  function handleCloseClick() {
    if (editable && data.id !== -1) {
      dispatch(RecipeActions.updateValue(data.id, 'edit', false));
    } else {
      dispatch(RecipeActions.close(data.id));
    }
  }

  let editOptions;
  if (userLoggedIn) {
    if (editable) {
      editOptions = (
        <HeaderIcon
          size="medium"
          color="secondary"
          onClick={() => dispatch(RecipeActions.save(data))}
        >
          <Save />
        </HeaderIcon>
      );
    } else {
      editOptions = (
        <HeaderIcon
          size="medium"
          color="secondary"
          onClick={() => {
            setFocusOnEdit(true);
            dispatch(RecipeActions.updateValue(data.id, 'edit', true));
          }}
        >
          <Edit />
        </HeaderIcon>
      );
    }
  }

  return (
    <>
      <ToolBar item xs={12} />
      <TitleBar container direction="row">
        {editable === true ? (
          <TitleInput
            inputRef={titleRef}
            value={data.title}
            margin="dense"
            variant="outlined"
            onChange={(e) =>
              dispatch(
                RecipeActions.updateValue(data.id, 'title', e.target.value)
              )
            }
          />
        ) : (
          <Typography variant="h4">{data.title}</Typography>
        )}

        <div>
          {editOptions}
          <CloseIcon size="medium" color="secondary" onClick={handleCloseClick}>
            <Close />
          </CloseIcon>
        </div>
      </TitleBar>
    </>
  );
}

export default connect()(RecipeHeader);
