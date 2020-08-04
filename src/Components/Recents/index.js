import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)'        
    },
    gridTile: {
        transition: 'all 0.2s',
        transform: 'scale(0.99)',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1)',
            '&>div' : {
                boxShadow: '2px 2px 2px #888'
            }
        }
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
        marginRight: 10,
        '&:hover' : {
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        }
    }
});

function RecentRecipes(props) {
    const { classes, recipes, openRecipe } = props;
    let cols = 3;
    let height = 500;
    if  (window.outerWidth <= 800) {
        cols = 1;
        height = 200;
    }
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={cols} cellHeight={height} spacing={8}>
                <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }} >
                    <ListSubheader component="header"><Typography variant="h6" color="primary" noWrap>Recent recipes</Typography></ListSubheader>
                </GridListTile>
                {recipes.map(recipe => {
                    return ( 
                        <GridListTile key={recipe.id} onClick={() => openRecipe(recipe.id)} className={classes.gridTile}>
                            <img src={recipe.picture} alt={recipe.title} />
                            <GridListTileBar
                                title={recipe.title}
                                subtitle={<span>by: {recipe.firstName + " " + recipe.lastName}</span>}
                            />
                        </GridListTile>
                    )
                })}
            </GridList>
        </div>
    );
}

export default withStyles(styles)(RecentRecipes);