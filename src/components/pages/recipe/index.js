import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    recipeImage: {
        width: '100%',
        marginBottom: 20
    },
    specContent: {
        backgroundColor: 'white'
    },
    specLabel: {
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    detailsContent: {
        height: '100%',
        padding: 16,
        backgroundColor: 'white'
    },
    ingredientListItem: {
        padding: '5px 16px'
    },
    stepListItem: {
        alignItems: 'flex-start'
    },
    imageColumn: {
        paddingTop : '0'
    },
    stepAvatar: {
        width: 25,
        height: 25
    },
    toolbar: theme.mixins.toolbar
});

class Recipe extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.content} spacing={24}>
                <Grid item xs={12} className={classes.toolbar} ></Grid>
                <Grid item xs={12}><Typography variant="h4">{this.props.data.title}</Typography></Grid>       
                <Grid item xs={4} className={classes.imageColumn}>
                    <img src={this.props.data.picture} className={classes.recipeImage} alt={this.props.data.title}/>
                    <List className={classes.specContent} dense={true}>
                        <ListItem alignItems="center" >
                            <Typography variant="h6" inline={true}>Total time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.totalTime}</Typography>
                        </ListItem>
                        <ListItem alignItems="center" >
                            <Typography variant="h6" inline={true}>Prep time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.prepTime}</Typography>
                        </ListItem>
                        <ListItem alignItems="center">
                        <Typography variant="h6" inline={true}>Cook time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.cookTime}</Typography>
                        </ListItem>
                        <ListItem alignItems="center">
                            <Typography variant="h6" inline={true}>Yield:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.servings} servings</Typography>
                        </ListItem>
                        <ListItem alignItems="center">
                            <Typography variant="h6" inline={true}>Ingredients:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.ingredients.length}</Typography>
                        </ListItem>
                    </List>
                </Grid>  
                <Grid item xs={8}>
                    <div className={classes.detailsContent}>
                        <Typography variant="h6">Ingredients</Typography>
                        <List>
                            {this.props.data.ingredients.map((ing) => {
                                return (
                                    <ListItem key={ing.refId} className={classes.ingredientListItem}>
                                        <ListItemText primary={ing.quantity + " " + ing.units + " " + ing.ingredientName} />
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Typography variant="h6">Steps</Typography>
                        <List component="ol">
                            {this.props.data.steps.map((step, index) => {
                                return (
                                    <ListItem key={index} className={classes.stepListItem}>
                                        <Avatar className={classes.stepAvatar}>{(++index)}</Avatar>
                                        <ListItemText primary={step} />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>
                </Grid>       
            </Grid>
        );
    }
}

export default withStyles(styles)(Recipe);