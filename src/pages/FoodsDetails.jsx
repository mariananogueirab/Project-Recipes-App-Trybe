import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button';
import { getFoodById, getDrinksRecomendation } from '../services/FetchApiAll';
import RecommendationCard from '../components/RecommendationCard';
import '../styles/recommendationCard.css';
import RecipesContext from '../context/RecipesContext';
import RecipesCardDetails from '../components/RecipesCardDetails';

function FoodsDetails() {
  const [recipe, getRecipe] = useState({});
  const [drinksRecomendations, setDrinksRecomendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipeMade, setRecipeMade] = useState(false);
  const contextValue = useContext(RecipesContext);
  const { recipesMade, setIngredientsInProgress } = contextValue;
  const INDEX_ID = 9;
  const id = useHistory().location.pathname.slice(INDEX_ID);

  useEffect(() => { // faz a requisição pra api pelo id, o requisito pede
    async function getRecipeById() {
      const meals = await getFoodById(id);
      getRecipe(meals[0]);
      setLoading(true);
    }
    getRecipeById();
    if (recipesMade.foods.some((food) => food === id)) {
      setRecipeMade(true); // esse if foi feito para bloquear o botão de iniciar receita, caso a receita já tenha sido feita
    }
  }, [id, recipesMade.foods]);

  useEffect(() => { // faz a requisição pra api da recomendação de drinks
    async function getDrinksRecom() {
      const drinks = await getDrinksRecomendation();
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
          && ingredient !== ' - '
          && ingredient !== 'null - null'
          && ingredient !== 'undefined - undefined'
        ));
      return finalingredients;
    }
  }

  const ingredients = getIngredientsAndMeasures();

  function handleStartRecipe() {
    setIngredientsInProgress({
      foods: ingredients,
    });
  }

  return (
    <div>
      {loading ? (
        <div>
          <RecipesCardDetails
            title={ recipe.strMeal }
            thumb={ recipe.strMealThumb }
            ingredients={ ingredients }
            instructions={ recipe.strInstructions }
            youtube={ recipe.strYoutube }
            category={ recipe.strCategory }
          />
          <RecommendationCard recommendations={ drinksRecomendations } />
          <Button
            testid="start-recipe-btn"
            label="Iniciar receita"
            className="buttonFixed" // requisito pede que o botão seja fixo lá embaixo
            disabled={ recipeMade }
            onClick={ handleStartRecipe }
          />
          <ShareIcon />
          <FavoriteIcon />
        </div>) : 'loading'}
    </div>
  );
}

export default FoodsDetails;
