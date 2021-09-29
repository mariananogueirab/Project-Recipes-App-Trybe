import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';

function FavoriteIcon({ recipe }) {
  const [favorited, setFavorited] = useState(false);
  const typeOf = useHistory().location.pathname.includes('comida') ? 'Meal' : 'Drink';
  const contextValue = useContext(RecipesContext);
  const { handleFavoriteRecipes, favoriteRecipes, removeFavoriteRecipes } = contextValue;
  console.log(favorited);

  const newFavoriteRecipes = {
    id: recipe[`id${typeOf}`],
    type: typeOf === 'Meal' ? 'comida' : 'bebida',
    area: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe[`str${typeOf}`],
    image: recipe[`str${typeOf}Thumb`],
  };

  function favoriteRecipe() {
    if (!favorited) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(
          [...favoriteRecipes, newFavoriteRecipes],
        ));
      setFavorited(true);
      handleFavoriteRecipes(newFavoriteRecipes);
    } else {
      localStorage.removeItem('favoriteRecipes');
      removeFavoriteRecipes(newFavoriteRecipes);
      setFavorited(false);
    }
  }

  function renderHeart() {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) !== null
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
    if (favRecipes
      .some((favRecipe) => favRecipe.id === newFavoriteRecipes.id) || favorited) {
      return blackHeartIcon;
    }
    return whiteHeartIcon;
  }

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      onClick={ favoriteRecipe }
      src={ renderHeart() }
      alt="favoritar receita"
    />
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteIcon;
