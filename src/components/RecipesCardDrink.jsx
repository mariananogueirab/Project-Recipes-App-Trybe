/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function RecipesCardFood() {
  const { data: { recipes } } = useContext(RecipesContext);
  // const number = 11;
  return (
    <div>
      {
        recipes.map(({ idDrink, strDrink, strCategory, strDrinkThumb }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
            />
            <h2 data-testid={ `${index}-card-name}` }>{ strDrink }</h2>
            <span>{ strCategory }</span>
          </div>
        ))
      }
    </div>
  );
}

export default RecipesCardFood;
