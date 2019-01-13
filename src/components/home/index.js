import React, { Component } from 'react';
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
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Recents recipes={this.props.recipe.recents}/>
            </main>
        );
    }
}

export default withStyles(styles)(Home);
