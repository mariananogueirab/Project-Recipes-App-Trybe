/* eslint-disable react/jsx-closing-tag-location */
import React, { useCallback, useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrinks from '../services/FetchApiDrinks';

function RecipesCardDrink() {
  const {
    data: { recipes },
    selected: { searchText, searchRadio },
    setSearchFood } = useContext(RecipesContext);

  const number = 12;

  const redirectRecipies = useCallback(() => {
    FetchApiDrinks(searchText, searchRadio, setSearchFood);
  }, [searchText, searchRadio, setSearchFood]);

  useEffect(() => {
    redirectRecipies();
  }, []);

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

export default RecipesCardDrink;
