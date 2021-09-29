import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesRecipes() {
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const number = 12;

  const favoriteRecipes = useCallback(() => ([{
    id: '52771',
    type: 'comida',
    area: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'bebida',
    area: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }]), []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes()));
  }, [favoriteRecipes]);

  const allocateRecipes = (recipesLocal) => {
    setRecipes((prevState) => ({
      ...prevState, meals: recipesLocal.filter(({ type }) => type === 'comida') }));
    setRecipes((prevState) => ({
      ...prevState, drinks: recipesLocal.filter(({ type }) => type === 'bebida') }));
  };

  useEffect(() => {
    const recipesLocal = localStorage.getItem('favoriteRecipes');
    if (recipesLocal) {
      allocateRecipes(JSON.parse(recipesLocal));
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" hasSearchIcon={ false } />
      <Button label="All" testid="filter-by-all-btn" />
      <Button label="Food" testid="filter-by-food-btn" />
      <Button label="Drinks" testid="filter-by-drink-btn" />

      {
        [...recipes.meals, ...recipes.drinks].map((
          { id, area, category, name, image, alcoholicOrNot }, index,
        ) => (
          <Link to={ `/comidas/${id}` } key={ id }>
            <div data-testid={ `${index}-${name}-horizontal-tag` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
              <h3 data-testid={ `${index}-horizontal-top-text` }>{ category }</h3>
              <span>
                { area }
              </span>
              <span>
                { alcoholicOrNot }
              </span>
              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="compartilhar"
              />
              {/* { copied ? 'Link copiado!' : 'Compartilhar Receita'} */}
              <input
                type="image"
                data-testid={ `${index}-horizontal-share-btn` }
                // onClick={ favoriteRecipe }
                src={ blackHeartIcon }
                alt="favoritar receita"
              />
            </div>
          </Link>
        )).slice(0, number)
      }

    </div>
  );
}

export default FavoritesRecipes;
