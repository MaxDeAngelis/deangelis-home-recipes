import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3
    },
    tablePaper: {
        backgroundColor: '#d0d0d0'
    },
    recipeIcon: {
        width: 24,
        height: 24
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        paddingTop: 20
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
        marginRight: 10,
        '&:hover' : {
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
    },
    toolbar: theme.mixins.toolbar
});

class Search extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h4" align="center">Search results</Typography>
                <GridList className={classes.gridList} cellHeight={200} cols={5} spacing={8}>
                    {this.props.results.map(recipe => {
                        var open = () => {
                            this.props.openRecipe(recipe.id)
                        }
                        return (
                            <GridListTile key={recipe.id}>
                                <img src={recipe.picture} alt={recipe.title} />
                                <GridListTileBar
                                    title={recipe.title}
                                    subtitle={<span>by: {recipe.firstName + " " + recipe.lastName}</span>}
                                    actionIcon={
                                        <IconButton className={classes.icon} onClick={open}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </main>
        );
    }
}

export default withStyles(styles)(Search);

/*
<Paper className={classes.tablePaper}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                <TableCell>Recipe title</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {this.props.results.map(recipe => (
                <TableRow key={recipe.id}>
                    <TableCell><img src={recipe.picture} className={classes.recipeIcon} alt={recipe.title}/></TableCell>
                    <TableCell>{recipe.title}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</Paper>
*/