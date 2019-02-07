import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RecipeActions } from '../../lib/actions';
import Recents from '../recents';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar
});

class Home extends Component {
    constructor(props) {
        super(props);

        this.openRecipe = this.openRecipe.bind(this);
    }
    openRecipe(id) {
        this.props.dispatch(RecipeActions.open(id))
    }
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Recents recipes={this.props.recipe.recents} openRecipe={this.openRecipe}/>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return state;
}
export default connect(mapStateToProps)(withStyles(styles)(Home));
