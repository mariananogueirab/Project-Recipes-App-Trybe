import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { getApiByAllFoods } from '../services/FetchApiAll';

function RecipesCardFood() {
  const [foodsAll, setFoodsAll] = useState([]);
  const { data: { recipes } } = useContext(RecipesContext);
  const history = useHistory();
  const number = 12;
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      global.alert(msg);
      return foodsAll;
    }
    if (recipes.length === 1) {
      history.push(`/comidas/${recipes[0].idMeal}`);
    }
    if (recipes.length > 0) return recipes;
    if (recipes.length === 0) return foodsAll;
  };

  useEffect(() => { // faz a requisição pra api de bebidas sem filtros
    async function getFoodsAll() {
      const meals = await getApiByAllFoods();
      setFoodsAll(meals);
    }
    getFoodsAll();
  }, []);

  return (
    renderRecipies().map(({ idMeal, strMeal, strMealThumb }, index) => (
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
  );
}

export default RecipesCardFood;
