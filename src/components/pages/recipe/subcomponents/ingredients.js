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

class Ingredients extends React.Component {
    constructor(props) {
        super(props);

        this.toggleIngredient = this.toggleIngredient.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
        this.updateIngredient = this.updateIngredient.bind(this);
    }
    toggleIngredient(index) {
        let newIngredients = this.props.ingredients;
        newIngredients[index]['selected'] = !newIngredients[index]['selected'];
        this.props.updateValue(newIngredients);
    }
    addIngredient() {
        let newIngredients = this.props.ingredients;
        newIngredients.push({
            ingredientId: "",
            ingredientName: "",
            quantity: "",
            units: "",
        })
        this.props.updateValue(newIngredients);
    }
    removeIngredient(index) {
        let newIngredients = this.props.ingredients;

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
    
        this.props.updateValue(newIngredients);
    }
    updateIngredient(key, value, index) {
        console.log(value);
        let newIngredients = this.props.ingredients;
        newIngredients[index][key] = value;
        this.props.updateValue(newIngredients);
    }
    getIngredient(ing, index) {
        const {classes} = this.props;

        if (this.props.edit) {
            let ingredients = this.props.availableIngredients.map((availIng) => {
                return {
                    value: availIng.ingredientName,
                    label: availIng.ingredientName
                }
            })
            let units = this.props.availableUnits.map((availUnit) => {
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
                        onChange={(e) => this.updateIngredient('quantity', e.target.value, index)}
                    />
                    <Autocomplete
                        value={{
                            value: ing.units,
                            label: ing.units
                        }}
                        options={units}
                        className={classes.unitsSelect}
                        onChange={(obj) => this.updateIngredient('units', obj.label, index)}
                    />
                    <Autocomplete
                        value={{
                            value: ing.ingredientName,
                            label: ing.ingredientName
                        }}
                        options={ingredients}
                        className={classes.ingredientSelect}
                        onChange={(obj) => this.updateIngredient('ingredientName', obj.label, index)}
                    />
                    <Fab aria-label="Delete" size="small" className={classes.delete} onClick={() => this.removeIngredient(index)}>
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
    render() {
        const {classes} = this.props;
        let controls;
        if (this.props.edit) {
            controls = <Button variant="contained" color="secondary" onClick={this.addIngredient}>Add ingredient</Button>;
        }
        return (
            <div className={classes.ingredientContainer}>
                <Typography variant="h5">Ingredients</Typography>
                <List>
                    {this.props.ingredients.map((ing, index) => {
                        return (
                            <ListItem key={index} className={classes.ingredientListItem}>
                                <ItemAvatar 
                                    selected={ing.selected}
                                    update={() => this.toggleIngredient(index)}
                                    disabled={this.props.edit}
                                    width={18}
                                    height={18}
                                />
                                {this.getIngredient(ing, index)}
                            </ListItem>
                        )
                    })}
                </List>
                {controls}
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Ingredients);