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
  const { handleFavoriteRecipes } = contextValue;

  const favoriteRecipes = {
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
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavorited(true);
      handleFavoriteRecipes(favoriteRecipes);
    } else {
      localStorage.removeItem('favoriteRecipes');
      setFavorited(false);
    }
  }

  return (
    <input
      type="image"
      data-testid="favorite-btn"
      onClick={ favoriteRecipe }
      src={ !favorited ? whiteHeartIcon : blackHeartIcon }
      alt="favoritar receita"
    />
  );
}

FavoriteIcon.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FavoriteIcon;
