import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';

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
    ingredientSelect: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit * 2,
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
    }
    toggleIngredient(index) {
        let newIngredients = this.props.ingredients;
        newIngredients[index]['selected'] = !newIngredients[index]['selected'];
        this.props.updateValue(newIngredients);
    }
    getIngredient(ing) {
        const {classes} = this.props;

        if (this.props.edit) {
            let ingredients = this.props.availableIngredients.map((availIng) => {
                return {
                    value: availIng.ingredientId,
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
                        value={ing.units}
                        margin="none"
                        variant="outlined"
                    />
                    <Autocomplete
                        value={{
                            value: ing.units,
                            label: ing.units
                        }}
                        options={units}
                        className={classes.unitsSelect}
                    />
                    <Autocomplete
                        value={{
                            value: ing.ingredientId,
                            label: ing.ingredientName
                        }}
                        options={ingredients}
                        className={classes.ingredientSelect}
                    />
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
        return (
            <>
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
                                {this.getIngredient(ing)}
                            </ListItem>
                        )
                    })}
                </List>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Ingredients);