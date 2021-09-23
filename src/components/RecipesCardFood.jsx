import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { getApiByAllFoods } from '../services/FetchApiAll';

function RecipesCardFood() {
  const { data: { recipes }, setSearchRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const number = 12;
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  // faz a primeira requsição a api para renderizar as opções iniciais
  const onFirstFetchApi = async () => {
    const allDrinks = await getApiByAllFoods();
    setSearchRecipes(allDrinks.meals);
  };
  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      return global.alert(msg);
    }
    if (recipes.length === 0 || recipes === null) onFirstFetchApi();
    if (recipes.length === 1) {
      history.push(`/comidas/${recipes[0].idMeal}`);
    }
    return (
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
    );
  };

  return (
    renderRecipies()
  );
}

export default RecipesCardFood;
