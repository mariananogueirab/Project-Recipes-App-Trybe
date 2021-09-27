import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardFood from '../components/RecipesCardFood';
import Header from '../components/Header';
import { getFoodCategories } from '../services/FetchApiAll';

function Foods({ match: { path } }) {
  const [categories, setCategories] = useState([]);

  // Requisição Api de Categorias de Comidas. Devem ser exibidas apenas as 5 primeiras categorias retornadas da API.
  // Neste caso, a função será executada similarmente ao 'componentDidMount', rodando apenas uma vez e na montagem do componente.
  useEffect(() => {
    async function ApiCategoriesFood() {
      const meals = await getFoodCategories();
      let categoriesArray = [];
      meals.forEach((element, index) => {
        const numberCategories = 5;
        if (index < numberCategories) {
          categoriesArray = [...categoriesArray, element.strCategory];
        }
      });
      console.log(categoriesArray);
      setCategories(categoriesArray);
    }
    ApiCategoriesFood();
  }, []);

  return (
    <div>
      <Header pageTitle="Comidas" hasSearchIcon="active" />
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
      <RecipesCardFood />
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;

export default Foods;
