import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button'

function FoodsDetails({ match: { params: { id } } }) {
  const [recipe, getRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const API_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    async function getRecipeById() {
      const { meals } = await fetch(`${API_BY_ID}${id}`)
      .then((res) => res.json());
      getRecipe(meals[0]);
      setLoading(true);
    }
    getRecipeById();
  }, [id]);

  function getIngredientsAndMeasures() {
    let ingredients = [];
    if(loading) {
      for (let indice = 1; indice <= 20; indice += 1) {
        const strIng = `strIngredient${indice}`;
        const strMeas = `strMeasure${indice}`;
        const strIngAndMeas = `${recipe[strIng]} - ${recipe[strMeas]}`;
        ingredients = [...ingredients, strIngAndMeas];
      }
      const finalingredients = ingredients.filter((ingredient) => ingredient !== ' -  ');
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
            {ingredients.map((ingredient, index) => <li key={ index } data-testid={`${index}-ingredient-name-and-measure`}>{ingredient}</li>)}
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <video src={ recipe.strYoutube } width="450" controls data-testid="video">
            <track kind="captions" />
            Seu navegador não suporta o elemento
          </video>
          <span data-testid="0-recomendation-card">Receitas Recomendadas</span>
          {/* Não tenho noção do que é esse card de recomendação */}
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
