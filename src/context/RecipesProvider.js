import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setdata] = useState({
    recipes: [],
    isLoading: false,
  });

  const setSearchRecipes = (search) => {
    setdata((prevState) => ({ ...prevState, recipes: search, isLoading: true }));
  };

  const [selected, setSelected] = useState({
    searchText: '',
    searchRadio: '',
  });

  const handleChangeSearch = ({ target: { name, value } }) => {
    setSelected((prevState) => ({ ...prevState, [name]: value }));
  };

  const [doneRecipes, setDoneRecipes] = useState([]); // é um array de objetos da seguinte forma:
  /* [{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita,
    doneDate: quando-a-receita-foi-concluida,
    tags: array-de-tags-da-receita-ou-array-vazio
}] */

  function handleDoneRecipes(recipe) {
    const newDoneRecipes = [...doneRecipes, recipe];
    setDoneRecipes(newDoneRecipes);
  }

  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {}, // colocar os ids
    cocktails: [],
  }); // segue o formato:
  /* {
    cocktails: {
        id-da-bebida: [lista-de-ingredientes-utilizados],
        ...
    },
    meals: {
        id-da-comida: [lista-de-ingredientes-utilizados],
        ...
    }
} */

  function handleMealsInProgress(idMeal, ingredientsMeal) {
    const recipesInProgress = { ...inProgressRecipes };
    const newRecipesInProgress = {
      ...recipesInProgress,
      meals: {
        ...recipesInProgress.meals,
        [idMeal]: ingredientsMeal,
      },
    };
    setInProgressRecipes(newRecipesInProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
  }

  function handleCocktailsInProgress(idDrink, ingredientsDrink) {
    const recipesInProgress = { ...inProgressRecipes };
    const newRecipesInProgress = {
      ...recipesInProgress,
      cocktails: {
        ...recipesInProgress.cocktails,
        [idDrink]: ingredientsDrink,
      },
    };
    setInProgressRecipes(newRecipesInProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProgress));
  }

  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // array de objetos, na seguinte forma:
  /* [{
    id: id-da-receita,
    type: comida-ou-bebida,
    area: area-da-receita-ou-texto-vazio,
    category: categoria-da-receita-ou-texto-vazio,
    alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
    name: nome-da-receita,
    image: imagem-da-receita
}] */

  function handleFavoriteRecipes(recipe) { // tô pegando pelo localStorage porque quando muda a URL não tá salvando o estado
    if (!(favoriteRecipes.some((recipeFav) => recipeFav.id === recipe.id))) {
      const favsLocalStorage = JSON.parse(localStorage
        .getItem('favoriteRecipes')) !== null
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      const newFavoriteRecipes = [...favsLocalStorage, recipe];
      setFavoriteRecipes(newFavoriteRecipes);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          newFavoriteRecipes,
        ));
    }
  } // só adiciona aos favoritos uma vez

  function removeFavoriteRecipes(recipe) { // tô pegando pelo localStorage porque quando muda a URL não tá salvando o estado
    const favsLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    const favoriteRecipesRem = [...favsLocalStorage];
    const newFavoriteRecipes = favoriteRecipesRem
      .filter((favRecipe) => favRecipe.id !== recipe.id);
    setFavoriteRecipes(newFavoriteRecipes);
    localStorage
      .setItem('favoriteRecipes', JSON.stringify(
        newFavoriteRecipes,
      ));
  }

  const contextValue = {
    data,
    selected,
    setSearchRecipes,
    handleChangeSearch,
    doneRecipes,
    handleDoneRecipes,
    inProgressRecipes,
    /* handleRecipesInProgress, */
    /* ingredientsInProgress, */
    /* handleIngredientsInProgress, */
    setInProgressRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    /* setIngredientsInProgress, */
    handleMealsInProgress,
    handleCocktailsInProgress,
    handleFavoriteRecipes,
    removeFavoriteRecipes,
    favoriteRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
