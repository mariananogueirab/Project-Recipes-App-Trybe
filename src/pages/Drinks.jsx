import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardDrink from '../components/RecipesCardDrink';
import Header from '../components/Header';
import { getDrinkCategories, getApiByAllDrinks,
  RecipesFilterDrink } from '../services/FetchApiAll';
import RecipesContext from '../context/RecipesContext';

function Drinks({ match: { path } }) {
  const [categories, setCategories] = useState([]);
  const [nameCategoryFilter, setNameCategoryFilter] = useState('');
  const [drinksAll, setDrinksAll] = useState([]);
  const { data: { recipes } } = useContext(RecipesContext);
  const history = useHistory();
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      global.alert(msg);
      return drinksAll;
    }
    if (recipes.length === 1) {
      history.push(`/bebidas/${recipes[0].idDrink}`);
    }
    if (recipes.length > 0) return recipes;
    if (recipes.length === 0) return drinksAll;
  };

  useEffect(() => { // faz a requisição pra api de bebidas sem filtros
    async function getDrinksAll() {
      const drinks = await getApiByAllDrinks();
      setDrinksAll(drinks);
    }
    getDrinksAll();
  }, []);

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

  // Requisito 28 - a realizar
  useEffect(() => {
    async function FilterRecipesDrink() {
      const drinks = await RecipesFilterDrink(nameCategoryFilter);
      console.log(drinks);
      if (nameCategoryFilter !== '') {
        setDrinksAll(drinks);
      }
    }
    FilterRecipesDrink();
  }, [nameCategoryFilter]);

  async function handleClick(nameCategory) {
    if (nameCategory !== nameCategoryFilter) {
      setNameCategoryFilter(nameCategory);
    } else {
      const drinks = await getApiByAllDrinks();
      setDrinksAll(drinks);
      setNameCategoryFilter('');
    }
  }

  async function handleClickAll() {
    const drinks = await getApiByAllDrinks();
    setNameCategoryFilter('');
    setDrinksAll(drinks);
  }

  return (
    <div>
      <Header pageTitle="Bebidas" hasSearchIcon="active" />
      <SearchBar path={ path } />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ handleClickAll }
      >
        All
      </button>
      {/* Renderiza os 5 botões de categorias */}
      {categories.map((element, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${element}-category-filter` }
          onClick={ () => { handleClick(element); } }
        >
          {element}
        </button>
      ))}
      <RecipesCardDrink renderRecipies={ () => renderRecipies() } />
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
