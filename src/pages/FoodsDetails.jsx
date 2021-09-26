import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button';
import { getFoodById, getDrinksRecomendation } from '../services/FetchApiAll';

function FoodsDetails() {
  const [recipe, getRecipe] = useState({});
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const INDEX_ID = 9;
  const id = useHistory().location.pathname.slice(INDEX_ID);

  console.log(drinksRecomendations);

  useEffect(() => { // faz a requisição pra api pelo id, o requisito pede
    async function getRecipeById() {
      const meals = await getFoodById(id);
      getRecipe(meals[0]);
      setLoading(true);
    }
    getRecipeById();
  }, [id]);

  useEffect(() => { // faz a requisição pra api da recomendação de drinks
    async function getDrinksRecom() {
      const drinks = getDrinksRecomendation();
      setDrinksRecomendations(drinks);
    }
    getDrinksRecom();
  }, []);

  function getIngredientsAndMeasures() { // Essa função pega as chaves dos ingredientes e junta com as medidas, juga em um array e filtra o que for nulo ou vazio ou undefined
    let ingredients = [];
    const NUMBER_OF_INGREDIENTS = 20;
    if (loading) {
      for (let indice = 1; indice <= NUMBER_OF_INGREDIENTS; indice += 1) {
        const strIng = `strIngredient${indice}`;
        const strMeas = `strMeasure${indice}`;
        const strIngAndMeas = `${recipe[strIng]} - ${recipe[strMeas]}`;
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
          <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <p data-testid="recipe-category">{recipe.strCategory}</p>
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
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <video src={ recipe.strYoutube } width="450" controls data-testid="video">
            <track kind="captions" />
            Seu navegador não suporta o elemento
          </video>
          <span data-testid="0-recomendation-card">Receitas Recomendadas</span>
          <Button testid="start-recipe-btn" label="Iniciar receita" />
          <ShareIcon />
          <FavoriteIcon />
        </div>) : 'loading'}
    </div>
  );
}

export default FoodsDetails;
