import React from 'react';
import { Link } from 'react-router-dom';

function RecipesCardFood({ renderRecipies }) {
  const number = 12;

  return (
    renderRecipies().map(({ idMeal, strMeal, strMealThumb }, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ idMeal }
      >
        <Link to={ `/comidas/${idMeal}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
          />
          <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
        </Link>
      </div>
    )).slice(0, number)
  );
}

export default RecipesCardFood;
