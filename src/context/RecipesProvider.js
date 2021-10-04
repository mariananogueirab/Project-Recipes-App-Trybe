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

  const [doneRecipes, setDoneRecipes] = useState([{
    id: 0,
    type: 'food',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  },
  {
    id: 1,
    type: 'drink',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  }]); // é um array de objetos da seguinte forma:
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

  const [inProgressRecipes, setInProgressRecipes] = useState({
    meals: {}, // colocar os ids
    coocktails: [],
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

  const [ingredientsInProgress, setIngredientsInProgress] = useState({
    meals: [], // colocar os ingredientes
    drinks: [],
  });

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

  /* function handleRecipesInProgress(idFood, idDrink) {
    const foodsinProgress = [...inProgressRecipes.coocktails, idFood];
    const drinksinProgress = [...inProgressRecipes.drinks, idDrink];
    const newRecipesInProgress = {
      foods: idFood ? foodsinProgress : inProgressRecipes.coocktails,
      drinks: drinksinProgress,
    };
    setInProgressRecipes(newRecipesInProgress);
  } */ // revisar

  /* function handleIngredientsInProgress(foodIngredients, drinkIngredients) {
    const foodsinProgress = foodIngredients;
    const drinksinProgress = drinkIngredients;
    const newRecipesInProgress = {
      foods: foodIngredients ? foodsinProgress : inProgressRecipes.meals,
      drinks: drinksinProgress,
    };
    setIngredientsInProgress(newRecipesInProgress);
  } */ // revisar

  const contextValue = {
    data,
    selected,
    setSearchRecipes,
    handleChangeSearch,
    doneRecipes,
    setDoneRecipes,
    inProgressRecipes,
    /* handleRecipesInProgress, */
    ingredientsInProgress,
    /* handleIngredientsInProgress, */
    setInProgressRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
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
