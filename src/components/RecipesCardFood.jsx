/* eslint-disable react/jsx-closing-tag-location */
import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiFoods from '../services/FetchApiFoods';

function RecipesCardFood() {
  const {
    data: { recipes },
    selected: { searchText, searchRadio },
    setSearchFood } = useContext(RecipesContext);

  const number = 12;

  const redirectRecipies = () => {
    FetchApiFoods(searchText, searchRadio, setSearchFood);
  };

  useEffect(() => {
    redirectRecipies();
  }, []);

  return (
    <div>
      {
        recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ idMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ strMeal }
            />
            <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
          </div>
        )).slice(0, number)
      }
    </div>
  );
}

export default RecipesCardFood;
