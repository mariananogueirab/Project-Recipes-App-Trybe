import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button';
import { getDrinkById, getFoodsRecomendation } from '../services/FetchApiAll';
import RecommendationCard from '../components/RecommendationCard';
import '../styles/recommendationCard.css';
import RecipesContext from '../context/RecipesContext';
import RecipesCardDetails from '../components/RecipesCardDetails';

function DrinksDetails() {
  const [drink, getDrink] = useState({}); // a requisição da api altera ele
  const [loading, setLoading] = useState(false);
  const [foodsRecomendations, setFoodsRecomendations] = useState([]); // a requisição da api altera ele
  const [recipeStatus, setRecipeStatus] = useState({
    recipeDone: false,
    recipeInProgress: false,
  });
  const contextValue = useContext(RecipesContext);
  const {
    doneRecipes,
    handleCocktailsInProgress,
    inProgressRecipes } = contextValue;
  const INDEX_ID = 9;
  const history = useHistory();
  const id = history.location.pathname.slice(INDEX_ID);

  useEffect(() => { // faz a requisição pra api pelo id
    async function getDrinks() {
      const drinks = await getDrinkById(id);
      getDrink(drinks[0]);
      setLoading(true);
    }
    getDrinks();
    if (doneRecipes.some((cocktail) => cocktail.id === id)) {
      const newRecipeStatus = { ...recipeStatus };
      setRecipeStatus({
        ...newRecipeStatus,
        recipeDone: true }); // esse if foi feito para bloquear o botão de iniciar receita, caso a receita já tenha sido feita
    }
    const localStRecipesInprogress = (
      JSON.parse(localStorage.getItem('inProgressRecipes')));
    if (localStRecipesInprogress !== null && localStRecipesInprogress.cocktails[id]) {
      const newRecipeStatus = { ...recipeStatus };
      setRecipeStatus({
        ...newRecipeStatus,
        recipeInProgress: true }); // status da receita
    }
  }, [id, doneRecipes, inProgressRecipes]);

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
          && ingredient !== ' - '
          && ingredient !== 'null - null'
          && ingredient !== 'undefined - undefined'
        ));
      return finalingredients;
    }
  }

  const ingredients = getIngredientsAndMeasures();

  function handleStartRecipe() {
    handleCocktailsInProgress(id, ingredients);
    history.push(`/bebidas/${id}/in-progress`);
  }

  return (
    <div>
      {loading ? (
        <div>
          <RecipesCardDetails
            title={ drink.strDrink }
            thumb={ drink.strDrinkThumb }
            ingredients={ ingredients }
            instructions={ drink.strInstructions }
            category={ drink.strAlcoholic }
          />
          <RecommendationCard recommendations={ foodsRecomendations } />
          <Button
            testid="start-recipe-btn"
            label={
              recipeStatus.recipeInProgress ? 'Continuar Receita' : 'Iniciar receita'
            }
            className="buttonFixed" // requisito pede que o botão seja fixo lá embaixo
            disabled={ recipeStatus.recipeDone }
            onClick={ handleStartRecipe }
          />
          <ShareIcon />
          <FavoriteIcon recipe={ drink } />
        </div>) : 'loading'}
    </div>
  );
}

export default DrinksDetails;
