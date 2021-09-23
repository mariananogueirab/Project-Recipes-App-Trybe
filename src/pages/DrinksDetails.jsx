import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button';
import { getDrinkById, getFoodsRecomendation } from '../services/FetchApiAll';

function DrinksDetails() {
  const [drink, getDrink] = useState({});
  const [foodsRecomendations, setFoodsRecomendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const INDEX_ID = 9;
  const id = useHistory().location.pathname.slice(INDEX_ID);

  console.log(foodsRecomendations);

  useEffect(() => { // faz a requisição pra api pelo id
    async function getDrinks() {
      const drinks = await getDrinkById(id);
      getDrink(drinks[0]);
      setLoading(true);
    }
    getDrinks();
  }, [id]);

  useEffect(() => { // faz a requisição pra api da recomendação de comidas
    async function getFoodsRecom() {
      const meals = await getFoodsRecomendation();
      setFoodsRecomendations(meals);
    }
    getFoodsRecom();
  }, []);

  function getIngredientsAndMeasures() { // Essa função pega as chaves dos ingredientes e junta com as medidas, juga em um array e filtra o que for nulo ou vazio ou undefined
    let ingredients = [];
    const NUMBER_OF_INGREDIENTS = 20;
    if (loading) {
      for (let indice = 1; indice <= NUMBER_OF_INGREDIENTS; indice += 1) {
        const strIng = `strIngredient${indice}`;
        const strMeas = `strMeasure${indice}`;
        const strIngAndMeas = `${drink[strIng]} - ${drink[strMeas]}`;
        ingredients = [...ingredients, strIngAndMeas];
      }
      const finalingredients = ingredients
        .filter((ingredient) => (
          ingredient !== ' -  '
          && ingredient !== 'null - null'
          && ingredient !== 'undefined - undefined'
        ));
      return finalingredients;
    }
  }

  const ingredients = getIngredientsAndMeasures();

  return (
    <div>
      {loading ? (
        <div>
          <h1 data-testid="recipe-title">{drink.strDrink}</h1>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          <p>Ingredientes:</p>
          <ul>
            {ingredients
              .map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {ingredient}
                </li>))}
          </ul>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <span data-testid="0-recomendation-card">Receitas Recomendadas</span>
          <Button testid="start-recipe-btn" label="Iniciar receita" />
          <ShareIcon />
          <FavoriteIcon />
        </div>) : 'loading'}
    </div>
  );
}

export default DrinksDetails;
