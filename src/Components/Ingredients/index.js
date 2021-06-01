import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/DeleteOutlined';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ItemAvatar from '../Avatar';

const styles = (theme) => ({
  select: {
    marginLeft: theme.spacing(2),
  },
  quantity: {
    width: 75,
    marginLeft: theme.spacing(2),
    '& input': {
      padding: 9,
    },
  },
  unitsSelect: {
    width: 150,
    marginLeft: theme.spacing(2),
  },
  ingredientContainer: {
    marginBottom: theme.spacing(2),
  },
  ingredientSelect: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  ingredientListItem: {
    padding: '5px 16px',
  },
  ingListItemText: {
    margin: 0,
    '&[data-selected=true]': {
      textDecoration: 'line-through',
    },
  },
  delete: theme.mixins.cancel,
});

function Ingredients(props) {
  const {
    availableIngredients,
    availableUnits,
    ingredients,
    updateValue,
    classes,
    edit,
  } = props;
  const [focusNew, setFocusNew] = useState(false);
  const ingRef = useRef(null);

  useEffect(() => {
    if (focusNew && ingRef) {
      ingRef.current.focus();
      setFocusNew(false);
    }
  }, [focusNew, ingRef]);

  function toggleIngredient(index) {
    const newIngredients = ingredients;
    newIngredients[index].selected = !newIngredients[index].selected;
    updateValue(newIngredients);
  }

  function addIngredient() {
    const newIngredients = ingredients;
    newIngredients.push({
      ingredientId: '',
      ingredientName: '',
      quantity: '',
      units: '',
    });
    updateValue(newIngredients);
    setFocusNew(true);
  }

  function removeIngredient(index) {
    const newIngredients = ingredients;

    // If trying to delete last item then just clear out the value
    if (newIngredients.length === 1) {
      newIngredients[index] = {
        ingredientId: '',
        ingredientName: '',
        quantity: '',
        units: '',
      };
    } else {
      newIngredients.splice(index, 1);
    }

    updateValue(newIngredients);
  }

  function updateIngredient(key, value, index) {
    const newIngredients = ingredients;
    newIngredients[index][key] = value;
    updateValue(newIngredients);
  }

  function getIngredient(ing, index) {
    if (edit) {
      const currentIngredients = availableIngredients.map(
        (availIng) => availIng.ingredientName
      );
      const units = availableUnits.map((availUnit) => availUnit);
      return (
        <>
          <TextField
            className={classes.quantity}
            inputRef={ingRef}
            value={ing.quantity}
            margin="none"
            variant="outlined"
            onChange={(e) =>
              updateIngredient('quantity', e.target.value, index)
            }
          />
          <Autocomplete
            clearOnBlur={false}
            value={ing.units || ''}
            options={units}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="none"
                onBlur={(e) => updateIngredient('units', e.target.value, index)}
              />
            )}
            size="small"
            className={classes.unitsSelect}
            onChange={(e, val) => updateIngredient('units', val, index)}
          />
          <Autocomplete
            clearOnBlur={false}
            value={ing.ingredientName || ''}
            options={currentIngredients}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                margin="none"
                onBlur={(e) =>
                  updateIngredient('ingredientName', e.target.value, index)
                }
              />
            )}
            size="small"
            className={classes.ingredientSelect}
            onChange={(e, val) =>
              updateIngredient('ingredientName', val, index)
            }
          />
          <Fab
            aria-label="Delete"
            size="small"
            className={classes.delete}
            onClick={() => removeIngredient(index)}
          >
            <Delete />
          </Fab>
        </>
      );
    }
    return (
      <ListItemText
        primary={`${ing.quantity} ${ing.units} ${ing.ingredientName}`}
        className={classes.ingListItemText}
        data-selected={ing.selected}
      />
    );
  }

  return (
    <div className={classes.ingredientContainer}>
      <Typography variant="h5">Ingredients</Typography>
      <List>
        {ingredients.map((ing, index) => (
          <ListItem
            key={ing.ingredientId}
            className={classes.ingredientListItem}
          >
            <ItemAvatar
              selected={ing.selected}
              update={() => toggleIngredient(index)}
              disabled={edit}
              width={18}
              height={18}
              label=""
            />
            {getIngredient(ing, index)}
          </ListItem>
        ))}
      </List>
      {edit ? (
        <Button variant="contained" color="secondary" onClick={addIngredient}>
          Add ingredient
        </Button>
      ) : null}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Ingredients);
