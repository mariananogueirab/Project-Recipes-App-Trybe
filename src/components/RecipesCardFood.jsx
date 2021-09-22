/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipesCardFood() {
  const { data: { recipes } } = useContext(RecipesContext);
  return (
    <div>
      {
        recipes.map(({ idMeal, strMeal, strCategory, strMealThumb }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h2 data-testid={ `${index}-card-name}` }>{ strMeal }</h2>
            <span>{ strCategory }</span>
          </div>
        ))
      }
    </div>
  );
}

export default RecipesCardFood;
