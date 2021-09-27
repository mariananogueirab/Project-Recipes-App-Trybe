import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardDrink from '../components/RecipesCardDrink';
import Header from '../components/Header';
import { getDrinkCategories } from '../services/FetchApiAll';

function Drinks({ match: { path } }) {
  const [categories, setCategories] = useState([]);
  // Requisição Api de Categorias de Drinks. Devem ser exibidas apenas as 5 primeiras categorias retornadas da API.
  // Neste caso, a função será executada similarmente ao 'componentDidMount', rodando apenas uma vez e na montagem do componente.
  useEffect(() => {
    async function ApiCategoriesDrinks() {
      const drinks = await getDrinkCategories();
      let categoriesArray = [];
      drinks.forEach((element, index) => {
        const numberCategories = 5;
        if (index < numberCategories) {
          categoriesArray = [...categoriesArray, element.strCategory];
        }
      });
      console.log(categoriesArray);
      setCategories(categoriesArray);
    }
    ApiCategoriesDrinks();
  }, []);
  return (
    <div>
      <Header pageTitle="Bebidas" hasSearchIcon="active" />
      <SearchBar path={ path } />
      {/* Renderiza os 5 botões de categorias */}
      {categories.map((element, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${element}-category-filter` }
        >
          {element}
        </button>
      ))}
      <RecipesCardDrink />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;

export default Drinks;
