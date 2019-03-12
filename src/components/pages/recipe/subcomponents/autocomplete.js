import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import Select from 'react-select';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    input: {
        display: 'flex',
        padding: 0,
        '& input' : {
            opacity: '1 !important'
        }
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    menuItem: {
        padding: '2px 18px 2px 6px',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    menuItemSelected: {
        padding: '2px 18px 2px 6px',
        backgroundColor: theme.palette.action.selected
    },
});

function Menu(props) {
    return (
        <Paper className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function Option(props) {
    let style = props.selectProps.classes.menuItem;
    if (props.isSelected) {
        style = props.selectProps.classes.menuItemSelected;
    }
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isSelected}
            className={style} 
            component="div"
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            margin="none"
            variant="outlined"
            onChange={(e) => props.selectProps.onChange({label:e.target.value})}
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
        />
    );
}

const components = {
    Control,
    Menu,
    Option,
};

class Autocomplete extends React.Component {
    render() {
        const {classes, theme} = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <Select
                value={this.props.value}    
                inputValue={this.props.value.label}        
                classes={classes}
                styles={selectStyles}
                options={this.props.options}
                components={components}
                className={this.props.className}
                onChange={this.props.onChange}
            />
        );
    }
}

export default withStyles(styles, { withTheme: true })(Autocomplete);