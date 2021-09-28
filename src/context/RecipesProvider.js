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

  const [recipesMade, setRecipesMade] = useState({
    foods: [], // colocar os ids
    drinks: [],
  });

  const [recipesInProgress, setRecipesInProgress] = useState({
    foods: [], // colocar os ids
    drinks: [],
  });

  const [ingredientsInProgress, setIngredientsInProgress] = useState({
    foods: [], // colocar os ingredientes
    drinks: [],
  });

  const contextValue = {
    data,
    selected,
    setSearchRecipes,
    handleChangeSearch,
    recipesMade,
    setRecipesMade,
    recipesInProgress,
    setRecipesInProgress,
    ingredientsInProgress,
    setIngredientsInProgress,
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
