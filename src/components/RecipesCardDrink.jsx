import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { getApiByAllDrinks } from '../services/FetchApiAll';

function RecipesCardDrink() {
  const { data: { recipes }, setSearchRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const number = 12;
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  // faz a primeira requsição a api para renderizar as opções iniciais
  const onFirstFetchApi = async () => {
    const allDrinks = await getApiByAllDrinks();
    setSearchRecipes(allDrinks.drinks);
  };
  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      global.alert(msg);
    }
    if (recipes.length === 0 || recipes === null) onFirstFetchApi();
    if (recipes.length === 1) {
      history.push(`/bebidas/${recipes[0].idDrink}`);
    }
    return (
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
    );
  };

  return (
    renderRecipies()
  );
}

export default RecipesCardDrink;
