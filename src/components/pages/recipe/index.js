import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/EditOutlined';
import Save from '@material-ui/icons/SaveOutlined';

import Cropper from './image-cropper';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    titleBar: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 12px'
    },
    titleInput: {
        flexGrow: 1,
        '& input': {
            fontSize: '2rem'
        }
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
        paddingTop : '0',
        '& > *:first-child': {
            marginBottom: 20
        }
    },
    stepAvatar: {
        width: 25,
        height: 25
    },
    headerIcon: {
        marginLeft: 10
    },
    toolbar: theme.mixins.toolbar,
    close: theme.mixins.cancel
});

class Recipe extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.content} spacing={24}>
                <Grid item xs={12} className={classes.toolbar} ></Grid>
                <Grid container direction="row" className={classes.titleBar}>
                    {this.props.data.edit === true ? <TextField
                        value={this.props.data.title}
                        margin="dense"
                        variant="outlined"
                        className={classes.titleInput}
                        onChange={(e) => this.props.updateValue(this.props.data.id, "title", e.target.value)}
                    /> : <Typography variant="h4">{this.props.data.title}</Typography> }
                    
                    <div>
                        {this.props.data.edit === true ?
                            <Fab className={classes.headerIcon} size="medium" color="secondary" onClick={() => this.props.updateValue(this.props.data.id, "edit", false)}><Save/></Fab> : 
                            <Fab className={classes.headerIcon} size="medium" color="secondary" onClick={() => this.props.updateValue(this.props.data.id, "edit", true)}><Edit/></Fab> 
                        }
                        <Fab className={[classes.headerIcon, classes.close]} size="medium" color="secondary" onClick={() => this.props.close(this.props.data.id)}><Close/></Fab>
                    </div>
                </Grid>      
                <Grid item xs={12} sm={4} className={classes.imageColumn}>
                    <Cropper
                        image={this.props.data.picture + "?" + this.props.data.dateModified}
                        editable={this.props.data.edit}
                        altText={this.props.data.title}
                        width={400}
                        height={400}
                        onCropComplete={(url) => this.props.updateValue(this.props.data.id, "picture", url)}
                    />
                    <List className={classes.specContent} dense={true}>
                        {this.props.data.totalTime !== "" ? <ListItem alignItems="center" >
                            <Typography variant="subtitle1" inline={true}>Total time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.totalTime}</Typography>
                        </ListItem> : ""}
                        {this.props.data.prepTime!== "" ? <ListItem alignItems="center" >
                            <Typography variant="subtitle1" inline={true}>Prep time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.prepTime}</Typography>
                        </ListItem> : ""}
                        {this.props.data.cookTime !== "" ? <ListItem alignItems="center">
                            <Typography variant="subtitle1" inline={true}>Cook time:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.cookTime}</Typography>
                        </ListItem> : ""}
                        <ListItem alignItems="center">
                            <Typography variant="subtitle1" inline={true}>Yield:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.servings} servings</Typography>
                        </ListItem>
                        <ListItem alignItems="center">
                            <Typography variant="subtitle1" inline={true}>Ingredients:</Typography>
                            <Typography variant="h6" inline={true} className={classes.specLabel}>{this.props.data.ingredients.length}</Typography>
                        </ListItem>
                    </List>
                </Grid>  
                <Grid item xs={12} sm={8}>
                    <div className={classes.detailsContent}>
                        <Typography variant="h5">Ingredients</Typography>
                        <List>
                            {this.props.data.ingredients.map((ing, index) => {
                                return (
                                    <ListItem key={index} className={classes.ingredientListItem}>
                                        <ListItemText primary={ing.quantity + " " + ing.units + " " + ing.ingredientName} />
                                    </ListItem>
                                )
                            })}
                        </List>
                        <Typography variant="h5">Steps</Typography>
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