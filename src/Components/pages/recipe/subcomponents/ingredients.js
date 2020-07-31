import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/DeleteOutlined';
import ItemAvatar from './avatar.js';
import Autocomplete from './autocomplete.js';

const styles = theme => ({
    select: {
        marginLeft: theme.spacing.unit * 2,
    },
    quantity: {
        width: 75,
        marginLeft: theme.spacing.unit * 2,
        '& input' : {
            padding: 9
        }
    },
    unitsSelect: {
        width: 150,
        marginLeft: theme.spacing.unit * 2,
    },
    ingredientContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    ingredientSelect: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    ingredientListItem: {
        padding: '5px 16px'
    },
    ingListItemText: {
        '&[data-selected=true]': {
            textDecoration: 'line-through'
        },
    },
    delete: theme.mixins.cancel
});

function Ingredients(props) {
    const { availableIngredients, availableUnits, ingredients, updateValue, classes, edit } = props;

    function toggleIngredient(index) {
        let newIngredients = ingredients;
        newIngredients[index]['selected'] = !newIngredients[index]['selected'];
        updateValue(newIngredients);
    }
    
    function addIngredient() {
        let newIngredients = ingredients;
        newIngredients.push({
            ingredientId: "",
            ingredientName: "",
            quantity: "",
            units: "",
        })
        updateValue(newIngredients);
    }

    function removeIngredient(index) {
        let newIngredients = ingredients;

        // If trying to delete last item then just clear out the value
        if (newIngredients.length === 1) {
            newIngredients[index] = {
                ingredientId: "",
                ingredientName: "",
                quantity: "",
                units: "",
            };
        } else {
            newIngredients.splice(index, 1);
        }
    
        updateValue(newIngredients);
    }

    function updateIngredient(key, value, index) {
        let newIngredients = ingredients;
        newIngredients[index][key] = value;
        updateValue(newIngredients);
    }

    function getIngredient(ing, index) {
        if (edit) {
            let ingredients = availableIngredients.map((availIng) => {
                return {
                    value: availIng.ingredientName,
                    label: availIng.ingredientName
                }
            })
            let units = availableUnits.map((availUnit) => {
                return {
                    value: availUnit,
                    label: availUnit
                }
            })
            return (
                <>
                    <TextField
                        className={classes.quantity}
                        value={ing.quantity}
                        margin="none"
                        variant="outlined"
                        onChange={(e) => updateIngredient('quantity', e.target.value, index)}
                    />
                    <Autocomplete
                        value={{
                            value: ing.units,
                            label: ing.units
                        }}
                        options={units}
                        className={classes.unitsSelect}
                        onChange={(obj) => updateIngredient('units', obj.label, index)}
                    />
                    <Autocomplete
                        value={{
                            value: ing.ingredientName,
                            label: ing.ingredientName
                        }}
                        options={ingredients}
                        className={classes.ingredientSelect}
                        onChange={(obj) => updateIngredient('ingredientName', obj.label, index)}
                    />
                    <Fab aria-label="Delete" size="small" className={classes.delete} onClick={() => removeIngredient(index)}>
                        <Delete />
                    </Fab>
                </>
            )
        } else {
            return (
                <ListItemText 
                    primary={ing.quantity + " " + ing.units + " " + ing.ingredientName} 
                    className={classes.ingListItemText} 
                    data-selected={ing.selected}
                />
            )
        }
    }

    return (
        <div className={classes.ingredientContainer}>
            <Typography variant="h5">Ingredients</Typography>
            <List>
                {ingredients.map((ing, index) => {
                    return (
                        <ListItem key={index} className={classes.ingredientListItem}>
                            <ItemAvatar 
                                selected={ing.selected}
                                update={() => toggleIngredient(index)}
                                disabled={edit}
                                width={18}
                                height={18}
                            />
                            {getIngredient(ing, index)}
                        </ListItem>
                    )
                })}
            </List>
            {edit ? <Button variant="contained" color="secondary" onClick={addIngredient}>Add ingredient</Button> : null}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Ingredients);