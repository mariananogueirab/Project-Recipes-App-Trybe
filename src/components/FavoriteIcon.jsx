import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function FavoriteIcon({ recipe }) {
  const [favorited, setFavorited] = useState(false);
  const typeOf = useHistory().location.pathname.includes('comida') ? 'Meal' : 'Drink';
  const contextValue = useContext(RecipesContext);
  const { handleFavoriteRecipes, removeFavoriteRecipes } = contextValue;

  const newFavoriteRecipes = {
    id: recipe[`id${typeOf}`],
    type: typeOf === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[`str${typeOf}`],
    image: recipe[`str${typeOf}Thumb`],
  };

  const favsLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  const favoritedLocalStorage = favsLocalStorage
    .some((favRecipe) => favRecipe.id === newFavoriteRecipes.id);

  useEffect(() => {
    if (favoritedLocalStorage) {
      setFavorited(true);
    }
  }, [favoritedLocalStorage]);

  function favoriteRecipe() {
    setFavorited((prevState) => !prevState);
    if (!favorited) {
      handleFavoriteRecipes(newFavoriteRecipes);
    } else {
      removeFavoriteRecipes(newFavoriteRecipes);
    }
  }

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      onClick={ favoriteRecipe }
      src={ favorited ? blackHeartIcon : whiteHeartIcon }
      alt="favoritar receita"
    />
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteIcon;
