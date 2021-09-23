import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button';

function FoodsDetails({ match: { params: { id } } }) {
  const [recipe, getRecipe] = useState({});
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const API_DRINKS_RECOMENDATION = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => { // faz a requisição pra api pelo id, o requisito pede
    async function getRecipeById() {
      const { meals } = await fetch(`${API_BY_ID}${id}`)
        .then((res) => res.json());
      getRecipe(meals[0]);
      setLoading(true);
    }
    getRecipeById();
  }, [id]);

  console.log(drinksRecomendations);

  useEffect(() => { // faz a requisição pra api da recomendação de drinks
    async function getDrinksRecomendation() {
      const { drinks } = await fetch(API_DRINKS_RECOMENDATION)
        .then((res) => res.json());
      setDrinksRecomendations(drinks);
    }
    getDrinksRecomendation();
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

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FoodsDetails;
