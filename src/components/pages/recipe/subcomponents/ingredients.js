import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ItemAvatar from './avatar.js';

const styles = theme => ({
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
                                <ListItemText 
                                    primary={ing.quantity + " " + ing.units + " " + ing.ingredientName} 
                                    className={classes.ingListItemText} 
                                    data-selected={ing.selected}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </>
        );
    }
}

export default withStyles(styles)(Ingredients);