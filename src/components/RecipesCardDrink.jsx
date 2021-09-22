/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipesCardFood() {
  const { data: { recipes } } = useContext(RecipesContext);
  const number = 12;
  return (
    <div>
      {
        recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h2 data-testid={ `${index}-card-name` }>{ strDrink }</h2>
          </div>
        )).slice(0, number)
      }
    </div>
  );
}

export default RecipesCardFood;