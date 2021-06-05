import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
  specLabel: {
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  menuItem: {
    padding: '2px 18px 2px 6px',
    display: 'block',
    textAlign: 'right',
  },
  select: {
    marginLeft: 20,
    minWidth: 60,
    textAlign: 'right',
  },
});
const CustomInput = withStyles(() => ({
  input: {
    padding: '9px 32px 9px 9px',
  },
}))(OutlinedInput);

function pad(time) {
  return time < 10 ? `0${time.toString()}` : time.toString();
}

function Time(props) {
  const { time, updateValue, classes } = props;

  const hours = parseInt(time.split(':')[0], 10);
  const minutes = parseInt(time.split(':')[1], 10);

  function handleChangeHour(e) {
    const newTime = `${pad(e.target.value)}:${pad(
      parseInt(time.split(':')[1], 10)
    )}`;
    updateValue(newTime);
  }

  function handleChangeMin(e) {
    const newTime = `${pad(parseInt(time.split(':')[0], 10))}:${pad(
      e.target.value
    )}`;
    updateValue(newTime);
  }

  const hoursList = [];
  for (let i = 0; i <= 100; i += 1) {
    hoursList.push(
      <MenuItem key={i} value={i} className={classes.menuItem}>
        {i.toString()}
      </MenuItem>
    );
  }
  const minutesList = [];
  for (let y = 0; y < 60; y += 1) {
    minutesList.push(
      <MenuItem key={y} value={y} className={classes.menuItem}>
        {y.toString()}
      </MenuItem>
    );
  }
  return (
    <div>
      <Select
        value={hours}
        onChange={handleChangeHour}
        className={classes.select}
        input={<CustomInput labelWidth={0} />}
      >
        {hoursList}
      </Select>
      <Typography variant="h6" display="inline" className={classes.specLabel}>
        hrs
      </Typography>
      <Select
        value={minutes}
        onChange={handleChangeMin}
        className={classes.select}
        input={<CustomInput labelWidth={0} />}
      >
        {minutesList}
      </Select>
      <Typography variant="h6" display="inline" className={classes.specLabel}>
        min
      </Typography>
    </div>
  );
}

function Field(props) {
  const {
    id,
    label,
    suffix,
    value,
    valueKey,
    edit,
    variant,
    updateValue,
    classes,
  } = props;

  if (value !== '' || edit) {
    let content = (
      <Typography variant="h6" display="inline" className={classes.specLabel}>
        {value}
      </Typography>
    );
    let suffixComp;
    if (suffix !== '') {
      suffixComp = (
        <Typography variant="h6" display="inline" className={classes.specLabel}>
          {suffix}
        </Typography>
      );
    }
    if (edit) {
      if (variant === 'time') {
        content = (
          <Time
            time={value}
            classes={classes}
            key={id}
            updateValue={(val) => updateValue(id, valueKey, val)}
          />
        );
      } else if (variant === 'servings') {
        const list = [];
        for (let i = 1; i <= 100; i += 1) {
          list.push(
            <MenuItem key={i} value={i} className={classes.menuItem}>
              {i.toString()}
            </MenuItem>
          );
        }
        content = (
          <Select
            value={value}
            onChange={(e) => updateValue(id, valueKey, e.target.value)}
            className={classes.select}
            input={<CustomInput labelWidth={0} />}
          >
            {list}
          </Select>
        );
      } else {
        content = (
          <TextField
            value={value}
            margin="dense"
            variant="outlined"
            onChange={(e) => updateValue(id, valueKey, e.target.value)}
          />
        );
      }
    }
    return (
      <ListItem alignItems="center">
        <Typography variant="subtitle1" display="inline">
          {label}
        </Typography>
        {content}
        {suffixComp}
      </ListItem>
    );
  }
  return '';
}

export default withStyles(styles)(Field);
