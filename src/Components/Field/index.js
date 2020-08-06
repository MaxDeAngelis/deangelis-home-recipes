import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    specLabel: {
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    menuItem: {
        padding: '2px 18px 2px 6px',
        display: 'block',
        textAlign: 'right'
    },
    select: {
        marginLeft: 20,
        minWidth: 60,
        textAlign: 'right'
    }
});
const CustomInput = withStyles(theme => ({
    input: {
        padding: '9px 32px 9px 9px'
    }
}))(OutlinedInput);

class Time extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeHour = this.handleChangeHour.bind(this);
        this.handleChangeMin = this.handleChangeMin.bind(this);
    }
    pad(time) {
        return (time < 10) ? '0' + time.toString() : time.toString();
    }
    handleChangeHour(e) {
        let newTime = this.pad(e.target.value) + ":" + this.pad(parseInt(this.props.time.split(":")[1]));
        this.props.updateValue(newTime);
    }
    handleChangeMin(e) {
        let newTime =  this.pad(parseInt(this.props.time.split(":")[0])) + ":" + this.pad(e.target.value);
        this.props.updateValue(newTime);
    }
    render() {
        let hours = parseInt(this.props.time.split(":")[0]);
        let minutes = parseInt(this.props.time.split(":")[1]);

        const {classes} = this.props;
        let hoursList = [];
        for (var i = 0; i <= 100; i++) {
            hoursList.push(<MenuItem key={i} value={i} className={classes.menuItem}>{i.toString()}</MenuItem>)
        }
        let minutesList = [];
        for (var y = 0; y < 60; y++) {
            minutesList.push(<MenuItem key={y} value={y} className={classes.menuItem}>{y.toString()}</MenuItem>)
        }
        return (
            <div>
                <Select
                    value={hours}
                    onChange={this.handleChangeHour}
                    className={classes.select}
                    input={<CustomInput labelWidth={0} />}
                >
                    {hoursList}
                </Select>
                <Typography variant="h6" display={'inline'} className={classes.specLabel}>hrs</Typography>
                <Select
                    value={minutes}
                    onChange={this.handleChangeMin}
                    className={classes.select}
                    input={<CustomInput labelWidth={0} />}
                >
                    {minutesList}
                </Select>
                <Typography variant="h6" display={'inline'} className={classes.specLabel}>min</Typography>
            </div>
        )
    }
}

class Field extends React.Component {
    render() {
        const {classes} = this.props;
        if (this.props.value !== "" || this.props.edit) {
            let content = <Typography variant="h6" display={'inline'} className={classes.specLabel}>{this.props.value}</Typography>
            let suffix;
            if (this.props.suffix !== "") {
                suffix = <Typography variant="h6" display={'inline'} className={classes.specLabel}>{this.props.suffix}</Typography>
            }
            if (this.props.edit) {
                if (this.props.variant === "time") {
                    content = (
                        <Time 
                            time={this.props.value} 
                            classes={classes}
                            key={this.props.id}
                            updateValue={(value) => this.props.updateValue(this.props.id, this.props.valueKey, value)}
                        />
                    );
                } else if (this.props.variant === "servings") {
                    let list = [];
                    for (var i = 1; i <= 100; i++) {
                        list.push(<MenuItem key={i} value={i} className={classes.menuItem}>{i.toString()}</MenuItem>)
                    }
                    content = (
                        <Select
                            value={this.props.value}
                            onChange={(e) => this.props.updateValue(this.props.id, this.props.valueKey, e.target.value)}
                            className={classes.select}
                            input={<CustomInput labelWidth={0} />}
                        >
                            {list}
                        </Select>
                    )
                } else {
                    content = <TextField
                        value={this.props.value}
                        margin="dense"
                        variant="outlined"
                        onChange={(e) => this.props.updateValue(this.props.id, this.props.valueKey, e.target.value)}
                    />
                }
            }
            return (<ListItem alignItems="center" >
                <Typography variant="subtitle1" display={'inline'}>{this.props.label}</Typography>
                {content}
                {suffix}
            </ListItem>)
        } else {
            return "";
        }
    }
}

export default withStyles(styles)(Field);