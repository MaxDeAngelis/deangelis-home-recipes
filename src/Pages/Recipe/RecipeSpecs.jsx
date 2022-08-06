import React from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';
import List from '@material-ui/core/List';

import { RecipeActions } from '../../Lib/actions';
import Field from '../../Components/Field';
import { formatTime, calculateTotalTime } from './utils';

const SpecContent = styled(List)(() => ({
  backgroundColor: 'white',
}));

function RecipeSpecs(props) {
  const { data, dispatch } = props;

  let { prepTime } = data;
  let { cookTime } = data;

  if (!data.id) return null;

  const totalTime = calculateTotalTime(data.prepTime, data.cookTime);
  if (data.edit === false) {
    prepTime = formatTime(data.prepTime);
    cookTime = formatTime(data.cookTime);
  }

  return (
    <SpecContent dense>
      <Field value={totalTime} label="Total time:" />
      <Field
        id={data.id}
        value={prepTime}
        label="Prep time:"
        valueKey="prepTime"
        variant="time"
        edit={data.edit}
        updateValue={(id, key, value) =>
          dispatch(RecipeActions.updateValue(id, key, value))
        }
      />
      <Field
        id={data.id}
        value={cookTime}
        label="Cook time:"
        valueKey="cookTime"
        variant="time"
        edit={data.edit}
        updateValue={(id, key, value) =>
          dispatch(RecipeActions.updateValue(id, key, value))
        }
      />
      <Field
        id={data.id}
        value={data.servings}
        label="Yield:"
        valueKey="servings"
        variant="servings"
        suffix="servings"
        edit={data.edit}
        updateValue={(id, key, value) =>
          dispatch(RecipeActions.updateValue(id, key, value))
        }
      />
      <Field value={data.ingredients.length} label="Ingredients:" />
    </SpecContent>
  );
}

function mapStateToProps(state) {
  return { site: state.site, recipe: state.recipe };
}

export default connect(mapStateToProps)(RecipeSpecs);
