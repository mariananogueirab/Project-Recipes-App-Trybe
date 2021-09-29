import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

function RecipesMade() {
  const { doneRecipes } = useContext(RecipesContext);
  return (
    <main>
      <Header pageTitle="Receitas Feitas" hasSearchIcon={ false } />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      { doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="Imagem de comida"
            />
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
          </Link>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareIcon"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <p data-testid={ `${index}-Pasta-horizontal-tag` }>
            {recipe.tags[index]}
          </p>
          <p data-testid={ `${index}-Curry-horizontal-tag` }>
            {recipe.tags[index]}
          </p>
        </div>

      ))}
    </main>
  );
}

export default RecipesMade;
