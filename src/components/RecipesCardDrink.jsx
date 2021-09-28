import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getApiByAllDrinks } from '../services/FetchApiAll';

function RecipesCardDrink() {
  const [drinksAll, setDrinksAll] = useState([]);
  const { data: { recipes } } = useContext(RecipesContext);
  const history = useHistory();
  const number = 12;
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      global.alert(msg);
      return drinksAll;
    }
    if (recipes.length === 1) {
      history.push(`/bebidas/${recipes[0].idDrink}`);
    }
    if (recipes.length > 0) return recipes;
    if (recipes.length === 0) return drinksAll;
  };

  useEffect(() => { // faz a requisição pra api de bebidas sem filtros
    async function getDrinksAll() {
      const drinks = await getApiByAllDrinks();
      setDrinksAll(drinks);
    }
    getDrinksAll();
  }, []);

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
