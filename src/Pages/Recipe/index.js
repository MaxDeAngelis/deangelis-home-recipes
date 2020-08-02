import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { RecipeActions } from '../../Lib/actions';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';

import Fab from '@material-ui/core/Fab';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/EditOutlined';
import Save from '@material-ui/icons/SaveOutlined';

import Cropper from '../../Components/ImageCropper';
import Field from '../../Components/Field/index.js';
import Steps from '../../Components/Steps/index.js';
import Ingredients from '../../Components/Ingredients/index.js';

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
function Recipe(props) {
    const { recipe, classes, data, dispatch } = props;
    const titleRef = useRef(null);
    const [ focusOnEdit, setFocusOnEdit ] = useState(true);

    useEffect(() => {
        if ((focusOnEdit || data.id === -1) && titleRef && titleRef.current) {
            titleRef.current.focus();
        }
        setFocusOnEdit(false); 
    }, [data.id, data.edit, focusOnEdit, titleRef]);

    let prepTime = data.prepTime;
    let cookTime = data.cookTime;
    let totalTime = calculateTotalTime(data.prepTime, data.cookTime);
    if (data.edit === false) {
        prepTime = formatTime(data.prepTime);
        cookTime = formatTime(data.cookTime);
    }

    function handleCloseClick() {
        if (data.edit && data.id !== -1) {
            dispatch(RecipeActions.updateValue(data.id, "edit", false));
        } else {
            dispatch(RecipeActions.close(data.id));
        }
    }
    function calculateTotalTime(time1, time2) {
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
        return formatTime(hours + ":" + minutes);
    }

    function formatTime(time) {
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

    return (
        <Grid container className={classes.content} spacing={24}>
            <Grid item xs={12} className={classes.toolbar} ></Grid>
            <Grid container direction="row" className={classes.titleBar}>
                {data.edit === true ? <TextField
                    inputRef={titleRef}
                    value={data.title}
                    margin="dense"
                    variant="outlined"
                    className={classes.titleInput}
                    onChange={(e) => dispatch(RecipeActions.updateValue(data.id, "title", e.target.value))}
                /> : <Typography variant="h4">{data.title}</Typography> }
                
                <div>
                    {data.edit === true ?
                        <Fab className={classes.headerIcon} size="medium" color="secondary" onClick={() => dispatch(RecipeActions.save(data))}><Save/></Fab> : 
                        <Fab className={classes.headerIcon} size="medium" color="secondary" onClick={() => { 
                            setFocusOnEdit(true);
                            dispatch(RecipeActions.updateValue(data.id, "edit", true));
                        }}><Edit/></Fab> 
                    }
                    <Fab className={[classes.headerIcon, classes.close].join(" ")} size="medium" color="secondary" onClick={handleCloseClick}><Close/></Fab>
                </div>
            </Grid>      
            <Grid item xs={12} sm={4} className={classes.imageColumn}>
                <Cropper
                    image={data.picture + "?" + data.dateModified}
                    editable={data.edit}
                    altText={data.title}
                    width={400}
                    height={400}
                    onCropComplete={(url) => dispatch(RecipeActions.updateValue(data.id, "picture", url))}
                />
                <List className={classes.specContent} dense={true}>
                    <Field
                        value={totalTime}
                        label="Total time:"
                    />
                    <Field
                        id={data.id}
                        value={prepTime}
                        label="Prep time:"
                        valueKey="prepTime"
                        variant="time"
                        edit={data.edit}
                        updateValue={(id, key, value) => dispatch(RecipeActions.updateValue(id, key, value))}
                    />
                    <Field
                        id={data.id}
                        value={cookTime}
                        label="Cook time:"
                        valueKey="cookTime"
                        variant="time"
                        edit={data.edit}
                        updateValue={(id, key, value) => dispatch(RecipeActions.updateValue(id, key, value))}
                    />
                    <Field
                        id={data.id}
                        value={data.servings}
                        label="Yield:"
                        valueKey="servings"
                        variant="servings"
                        suffix="servings"
                        edit={data.edit}
                        updateValue={(id, key, value) => dispatch(RecipeActions.updateValue(id, key, value))}
                    />
                    <Field
                        value={data.ingredients.length}
                        label="Ingredients:"
                    />
                </List>
            </Grid>  
            <Grid item xs={12} sm={8}>
                <div className={classes.detailsContent}>
                    <Ingredients
                        availableIngredients={recipe.ingredients}
                        availableUnits={recipe.units}
                        ingredients={JSON.parse(JSON.stringify(data.ingredients))}
                        edit={data.edit} 
                        updateValue={(value) => dispatch(RecipeActions.updateValue(data.id, "ingredients", value))}
                    />
                    <Steps 
                        steps={JSON.parse(JSON.stringify(data.steps))}
                        edit={data.edit} 
                        updateValue={(value) => dispatch(RecipeActions.updateValue(data.id, "steps", value))}
                    />
                </div>
            </Grid>       
        </Grid>
    );

}

function mapStateToProps(state) {
    return {site : state.site, recipe : state.recipe}
}

export default connect(mapStateToProps)(withStyles(styles)(Recipe));