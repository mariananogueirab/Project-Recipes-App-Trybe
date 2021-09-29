import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';

function FavoritesRecipes() {
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const number = 12;

  const favoriteRecipes = useCallback(() => ([{
    id: '53014',
    type: 'comida',
    area: 'Italian',
    category: 'Miscellaneous',
    alcoholicOrNot: '',
    name: 'Pizza Express Margherita',
    image: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
  },
  {
    id: '14181',
    type: 'bebida',
    area: 'Italian',
    category: 'Coffee / Tea',
    alcoholicOrNot: 'Alcoholic',
    name: 'Cafe Savoy',
    image: 'https://www.thecocktaildb.com/images/media/drink/vqwptt1441247711.jpg',
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
        recipes.meals.map(({ id, area, category, name, image }, index) => (
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
                {' '}
              </span>
            </div>
          </Link>
        )).slice(0, number)
      }

    </div>
  );
}

export default FavoritesRecipes;
