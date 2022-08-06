import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { styled } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';

import { RecipeActions } from '../../Lib/actions';

import Cropper from '../../Components/ImageCropper';
import RecipeHeader from './RecipeHeader';
import RecipeSpecs from './RecipeSpecs';
import RecipeDetails from './RecipeDetails';

const RecipeContent = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const RecipeSide = styled(Grid)(() => ({
  paddingTop: '0',
  '& > *:first-child': {
    marginBottom: 20,
  },
}));

function Recipe(props) {
  const { recipe, site, dispatch } = props;
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const recipes = recipe.open.filter(
      (openRecipe) => openRecipe.id === params.recipeId
    );
    if (recipes[0]) {
      setData(recipes[0]);
    } else {
      dispatch(RecipeActions.open(params.recipeId));
    }
  }, [params, dispatch, recipe]);

  if (!data.id) return null;

  return (
    <RecipeContent container spacing={3}>
      <RecipeHeader data={data} editable={data.edit} userLoggedIn={site.user} />
      <RecipeSide item xs={12} sm={4}>
        <Cropper
          image={`${data.picture}?${data.dateModified}`}
          editable={data.edit}
          altText={data.title}
          width={400}
          height={400}
          onCropComplete={(url) =>
            dispatch(RecipeActions.updateValue(data.id, 'picture', url))
          }
        />
        <RecipeSpecs data={data} />
      </RecipeSide>
      <RecipeDetails data={data} />
    </RecipeContent>
  );
}

function mapStateToProps(state) {
  return { site: state.site, recipe: state.recipe };
}

export default connect(mapStateToProps)(Recipe);
