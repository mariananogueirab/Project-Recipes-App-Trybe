import React from 'react';
import { Link } from 'react-router-dom';

function RecipesCardDrink({ renderRecipies }) {
  const number = 12;

  return (
    renderRecipies().map(({ idDrink, strDrink, strDrinkThumb }, index) => (
      <div
        data-testid={ `${index}-recipe-card` }
        key={ idDrink }
      >
        <Link to={ `/bebidas/${idDrink}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ strDrink }
          />
          <h2 data-testid={ `${index}-card-name` }>{ strDrink }</h2>
        </Link>
      </div>
    )).slice(0, number)
  );
}

export default RecipesCardDrink;
