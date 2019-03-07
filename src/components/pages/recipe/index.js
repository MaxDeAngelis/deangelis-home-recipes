import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';

import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/EditOutlined';
import Save from '@material-ui/icons/SaveOutlined';

import Cropper from './image-cropper';
import Spec from './subcomponents/spec.js';
import Steps from './subcomponents/steps.js';
import Ingredients from './subcomponents/ingredients.js';

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
    detailsContent: {
        height: '100%',
        padding: 16,
        backgroundColor: 'white'
    },
    imageColumn: {
        paddingTop : '0',
        '& > *:first-child': {
            marginBottom: 20
        }
    },
    headerIcon: {
        marginLeft: 10
    },
    toolbar: theme.mixins.toolbar,
    close: theme.mixins.cancel
});

class Recipe extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseClick = this.handleCloseClick.bind(this);
    }
    handleCloseClick() {
        if (this.props.data.edit && this.props.data.id !== -1) {
            this.props.updateValue(this.props.data.id, "edit", false);
        } else {
            this.props.close(this.props.data.id);
        }
    }
    totalTime(time1, time2) {
        // Break the times up into hours and minutes
        let times1 = time1.split(":");
        let times2 = time2.split(":");

        // Convert time to pure minutes by multiplying the hours by 60
        let minutes1 = parseInt(times1[1]) + (parseInt(times1[0]) * 60);
        let minutes2 = parseInt(times2[1]) + (parseInt(times2[0]) * 60);

        // Divide and round time by 60 to get hours
        let hours = Math.floor((minutes1 + minutes2) / 60);

        // MOD by 60 to get just minutes
        let minutes = (minutes1 + minutes2) % 60;

        // Mush together and call format
        return this.formatTime(hours + ":" + minutes);
    }

    formatTime(time) {
        let times = time.split(":");
        let hours = times[0];
        let minutes = times[1];

        if (parseInt(hours) > 0) {
            hours = parseInt(hours) + " hrs ";
        } else {
            hours = "";
        }

        if (parseInt(minutes) > 0) {
            minutes = parseInt(minutes) + " min";
        } else {
            minutes = "";
        }

        return hours + minutes;
    }
    render() {
        const { classes } = this.props;
        let prepTime = this.props.data.prepTime;
        let cookTime = this.props.data.cookTime;
        let totalTime = this.totalTime(this.props.data.prepTime, this.props.data.cookTime);
        if (this.props.data.edit === false) {
            prepTime = this.formatTime(this.props.data.prepTime);
            cookTime = this.formatTime(this.props.data.cookTime);
        }
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
                        <Fab className={[classes.headerIcon, classes.close]} size="medium" color="secondary" onClick={this.handleCloseClick}><Close/></Fab>
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
                        <Spec
                            value={totalTime}
                            label="Total time:"
                        />
                        <Spec
                            id={this.props.data.id}
                            value={prepTime}
                            label="Prep time:"
                            valueKey="prepTime"
                            variant="time"
                            edit={this.props.data.edit}
                            updateValue={this.props.updateValue}
                        />
                        <Spec
                            id={this.props.data.id}
                            value={cookTime}
                            label="Cook time:"
                            valueKey="cookTime"
                            variant="time"
                            edit={this.props.data.edit}
                            updateValue={this.props.updateValue}
                        />
                        <Spec
                            id={this.props.data.id}
                            value={this.props.data.servings}
                            label="Yield:"
                            valueKey="servings"
                            variant="servings"
                            suffix="servings"
                            edit={this.props.data.edit}
                            updateValue={this.props.updateValue}
                        />
                        <Spec
                            value={this.props.data.ingredients.length}
                            label="Ingredients:"
                        />
                    </List>
                </Grid>  
                <Grid item xs={12} sm={8}>
                    <div className={classes.detailsContent}>
                        <Ingredients
                            ingredients={this.props.data.ingredients}
                            edit={this.props.data.edit} 
                            updateValue={(value) => this.props.updateValue(this.props.data.id, "ingredients", value)}
                        />
                        <Steps 
                            steps={this.props.data.steps}
                            edit={this.props.data.edit} 
                            updateValue={(value) => this.props.updateValue(this.props.data.id, "steps", value)}
                        />
                    </div>
                </Grid>       
            </Grid>
        );
    }
}

export default withStyles(styles)(Recipe);