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
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      { doneRecipes.map((recipe, indice) => (
        <div key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${indice}-horizontal-image` }
              src={ recipe.image }
              alt="Imagem de comida"
              width="50px"
            />
            <p data-testid={ `${indice}-horizontal-name` }>
              { recipe.name }
            </p>
          </Link>
          <img
            data-testid={ `${indice}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareIcon"
          />
          <p data-testid={ `${indice}-horizontal-top-text` }>
            { recipe.category }
          </p>
          <p data-testid={ `${indice}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          <p data-testid={ `${indice}-Pasta-horizontal-tag` }>
            {recipe.tags[0]}
          </p>
          <p data-testid={ `${indice}-Curry-horizontal-tag` }>
            {recipe.tags[1]}
          </p>
        </div>

      ))}
    </main>
  );
}

export default RecipesMade;
