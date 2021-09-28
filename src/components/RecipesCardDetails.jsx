import React from 'react';
import PropTypes from 'prop-types';

function RecipesCardDetails({
  title, thumb, category, ingredients, instructions, youtube }) {
  return (
    <div>
      <h1 data-testid="recipe-title">{title}</h1>
      <img
        data-testid="recipe-photo"
        src={ thumb }
        alt={ title }
        width="400"
      />
      {category && <p data-testid="recipe-category">{category}</p>}
      <p>Ingredientes:</p>
      <ul>
        {ingredients
          .map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {ingredient}
            </li>))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {youtube && (
        <video src={ youtube } width="450" controls data-testid="video">
          <track kind="captions" />
          Seu navegador não suporta o elemento
        </video>
      )}

    </div>
  );
}

RecipesCardDetails.propTypes = {
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  youtube: PropTypes.string,
  category: PropTypes.string.isRequired,
};

RecipesCardDetails.defaultProps = {
  youtube: null,
};

export default RecipesCardDetails;
