import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
});

class RecipeReviewCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            expanded: false 
        };
    }

    handleExpandClick = () => {
        this.setState({ 
            expanded: !this.state.expanded 
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={3} cellHeight={400} spacing={8}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }} >
                        <ListSubheader component="header"><Typography variant="h6" color="primary" noWrap>Recent recipes</Typography></ListSubheader>
                    </GridListTile>
                    {this.props.recipes.map(recipe => (
                        <GridListTile key={recipe.id}>
                            <img src={recipe.picture} alt={recipe.title} />
                            <GridListTileBar
                                title={recipe.title}
                                subtitle={<span>by: {recipe.firstName + " " + recipe.lastName}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon/>
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default withStyles(styles)(RecipeReviewCard);