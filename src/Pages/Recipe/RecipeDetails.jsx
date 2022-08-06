import React from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';

import { RecipeActions } from '../../Lib/actions';

import Steps from '../../Components/Steps';
import Ingredients from '../../Components/Ingredients';

const Details = styled(Grid)(() => ({
  height: '100%',
  padding: 16,
  backgroundColor: 'white',
}));

function RecipeDetails(props) {
  const { recipe, data, dispatch } = props;

  return (
    <Grid item xs={12} sm={8}>
      <Details item>
        <Ingredients
          availableIngredients={recipe.ingredients}
          availableUnits={recipe.units}
          ingredients={JSON.parse(JSON.stringify(data.ingredients))}
          edit={data.edit}
          updateValue={(value) =>
            dispatch(RecipeActions.updateValue(data.id, 'ingredients', value))
          }
        />
        <Steps
          steps={JSON.parse(JSON.stringify(data.steps))}
          edit={data.edit}
          updateValue={(value) =>
            dispatch(RecipeActions.updateValue(data.id, 'steps', value))
          }
        />
      </Details>
    </Grid>
  );
}

function mapStateToProps(state) {
  return { site: state.site, recipe: state.recipe };
}

export default connect(mapStateToProps)(RecipeDetails);
