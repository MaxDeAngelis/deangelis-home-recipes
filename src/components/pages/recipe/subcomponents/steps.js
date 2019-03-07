import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/DeleteOutlined';

const styles = theme => ({
    stepRow: {
        marginLeft: 16,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        '& > *:first-child': {
            marginRight: 16,
        }
    },
    stepListItem: {
        alignItems: 'flex-start'
    },
    stepAvatar: {
        width: 25,
        height: 25
    },
    delete: theme.mixins.cancel
});

class Steps extends React.Component {
    constructor(props) {
        super(props);

        this.addStep = this.addStep.bind(this);
        this.updateStep = this.updateStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
    }
    getStep(step, index) {
        const {classes} = this.props;
        if (this.props.edit) {
            return (
                <div className={classes.stepRow}>
                    <TextField
                        value={step}
                        placeholder="Please enter step instructions"
                        multiline
                        fullWidth
                        margin="none"
                        variant="filled"
                        onChange={(e) => this.updateStep(e.target.value, index)}
                    />
                    <Fab aria-label="Delete" size="small" className={classes.delete} onClick={() => this.removeStep(index)}>
                        <Delete />
                    </Fab>
                </div>
            );
        } else {
            return <ListItemText primary={step} />;
        }
    }
    addStep() {
        let newSteps = this.props.steps;
        newSteps.push("");
        this.props.updateValue(newSteps);
    }
    updateStep(value, index) {
        let newSteps = this.props.steps;
        newSteps[index] = value;
        this.props.updateValue(newSteps);
    }
    removeStep(index) {
        let newSteps = this.props.steps;
        // If trying to delete last item then just clear out the value
        if (newSteps.length === 1) {
            newSteps[index] = "";
        } else {
            newSteps.splice(index, 1);
        }
    
        this.props.updateValue(newSteps);
    }
    render() {
        const {classes} = this.props;
        let controls;
        if (this.props.edit) {
            controls = <Button variant="contained" color="secondary" onClick={this.addStep}>Add step</Button>;
        }
        return (
            <div>
                <Typography variant="h5">Steps</Typography>
                <List component="ol">
                    {this.props.steps.map((step, index) => {
                        return (
                            <ListItem key={index} className={classes.stepListItem}>
                                <Avatar className={classes.stepAvatar}>{index + 1}</Avatar>
                                {this.getStep(step, index)}
                            </ListItem>
                        )
                    })}
                </List>
                {controls}
            </div>
        );
    }
}

export default withStyles(styles)(Steps);