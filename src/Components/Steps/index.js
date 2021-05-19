import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/DeleteOutlined';
import ItemAvatar from '../Avatar';

const styles = (theme) => ({
  stepRow: {
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '& > *:first-child': {
      marginRight: 16,
    },
  },
  stepInput: {
    marginTop: 0,
  },
  stepListItem: {
    alignItems: 'flex-start',
  },
  stepListItemText: {
    margin: 0,
    '&[data-selected=true]': {
      textDecoration: 'line-through',
    },
  },
  delete: theme.mixins.cancel,
});

function Step(props) {
  const { step, stepRef, index, edit, steps, classes, updateValue } = props;

  function removeStep(i) {
    const newSteps = steps;
    // If trying to delete last item then just clear out the value
    if (newSteps.length === 1) {
      newSteps[i].text = '';
    } else {
      newSteps.splice(i, 1);
    }
    updateValue(newSteps);
  }

  function updateStep(value, i) {
    const newSteps = steps;
    newSteps[i].text = value;
    updateValue(newSteps);
  }

  if (edit) {
    return (
      <div className={classes.stepRow}>
        <TextField
          inputRef={stepRef}
          value={step.text}
          placeholder="Please enter step instructions"
          multiline
          fullWidth
          margin="dense"
          variant="outlined"
          className={classes.stepInput}
          onChange={(e) => updateStep(e.target.value, index)}
        />
        <Fab
          aria-label="Delete"
          size="small"
          className={classes.delete}
          onClick={() => removeStep(index)}
        >
          <Delete />
        </Fab>
      </div>
    );
  }
  return (
    <ListItemText
      className={classes.stepListItemText}
      primary={step.text}
      data-selected={step.selected}
    />
  );
}

function Steps(props) {
  const { edit, steps, classes, updateValue } = props;
  const [focusNew, setFocusNew] = useState(false);
  const stepRef = useRef(null);

  useEffect(() => {
    if (focusNew && stepRef && stepRef.current) {
      stepRef.current.focus();
      setFocusNew(false);
    }
  }, [focusNew, stepRef]);

  function addStep() {
    const newSteps = steps;
    newSteps.push({ text: '', selected: false });
    setFocusNew(true);
    updateValue(newSteps);
  }

  function toggleStep(index) {
    const newSteps = steps;
    newSteps[index].selected = !newSteps[index].selected;
    updateValue(newSteps);
  }

  let controls;
  if (edit) {
    controls = (
      <Button variant="contained" color="secondary" onClick={addStep}>
        Add step
      </Button>
    );
  }
  return (
    <>
      <Typography variant="h5">Steps</Typography>
      <List component="ol">
        {steps.map((step, index) => (
          <ListItem key={step.id} className={classes.stepListItem}>
            <ItemAvatar
              label={index}
              selected={step.selected}
              update={() => toggleStep(index)}
              disabled={edit}
            />
            <Step
              {...{
                stepRef,
                step,
                index,
                edit,
                steps,
                classes,
                updateValue,
              }}
            />
          </ListItem>
        ))}
      </List>
      {controls}
    </>
  );
}

export default withStyles(styles)(Steps);
