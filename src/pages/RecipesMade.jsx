import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../components/ShareIcon';
import RecipesContext from '../context/RecipesContext';

function RecipesMade() {
  const { doneRecipes } = useContext(RecipesContext);
  const [recipesMade, setRecipesMade] = useState(doneRecipes);

  function handleFilterByFood() {
    const recipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
    setRecipesMade(recipes);
  }
  function handleFilterByDrink() {
    const recipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    setRecipesMade(recipes);
  }

  return (
    <main>
      <Header pageTitle="Receitas Feitas" hasSearchIcon={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setRecipesMade(doneRecipes) }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ handleFilterByFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ handleFilterByDrink }
      >
        Drinks
      </button>
      { recipesMade.length === 0 ? <p> Você não possui receitas feitas :( </p>
        : recipesMade.map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="Imagem de comida"
                width="50px"
              />
              <p data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </p>
            </Link>
            <ShareIcon
              dataTestid={ `${index}-horizontal-share-btn` }
              url={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }
            />
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            <p data-testid={ `${index}-Pasta-horizontal-tag` }>
              {recipe.tags[0]}
            </p>
            <p data-testid={ `${index}-Curry-horizontal-tag` }>
              {recipe.tags[1]}
            </p>
            { recipe.type === 'comida'
              ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.area} - ${recipe.category}` }
                </p>
              )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot }
                </p>)}
          </div>
        ))}
    </main>
  );
}

export default RecipesMade;
