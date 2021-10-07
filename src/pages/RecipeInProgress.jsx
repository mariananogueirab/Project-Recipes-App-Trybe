import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router';
import RecipeHeaderCard from '../components/RecipeHeaderCard';
import RecipeInstructions from '../components/RecipeInstructions';

const RecipeInProgress = () => {
  // status para salvar a receita e os ingredientes
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();

  // hooks do react-router
  const location = useLocation();
  const match = useRouteMatch();

  // verifica qual api ele deve chamar
  const api = location.pathname.includes('/bebidas')
    ? 'thecocktaildb'
    : 'themealdb';

  // verifica o padrao de nome das chaves baseado na api a ser chamada
  const foodType = api === 'thecocktaildb'
    ? 'Drink'
    : 'Meal';

  // pega a receita pelo ID;
  // inserir o fetch no FetchApiAll
  const getRecipeHook = useCallback(async () => {
    const foodId = match.params.id;
    const response = await fetch(`https://www.${api}.com/api/json/v1/1/lookup.php?i=${foodId}`)
      .then((res) => res.json());

    try {
      const food = Object.values(response)[0][0];
      setRecipe(food);
    } catch (error) {
      global.alert('Esta receita não existe');
    }
  }, [api, match]);

  // cria um array com os ingredientes validos para ser passado pro component RecipeInstructions
  // o useCallback armazena e evita re-renderizações
  const fillIngredientsHook = useCallback((arr) => {
    const ingredientsList = [];
    const objectLength = Object.keys(arr).length;

    for (let index = 1; index < objectLength; index += 1) {
      if (arr[`strIngredient${index}`]) {
        ingredientsList.push(arr[`strIngredient${index}`]);
      } else {
        break;
      }
    }
    setIngredients(ingredientsList);
  }, [setIngredients]);

  useEffect(() => {
    getRecipeHook();
  }, [getRecipeHook]);

  useEffect(() => {
    if (recipe !== undefined) {
      fillIngredientsHook(recipe);
    }
  }, [recipe, fillIngredientsHook]);

  return (
    <div>
      {
        recipe && ingredients ? (
          <>
            <RecipeHeaderCard recipe={ recipe } foodType={ foodType } />
            <RecipeInstructions
              ingredients={ ingredients }
              recipe={ recipe }
              foodType={ foodType }
            />
          </>
        )
          : <p>Loading...</p>
      }
    </div>
  );
};

export default RecipeInProgress;
