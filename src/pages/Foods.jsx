import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardFood from '../components/RecipesCardFood';
import Header from '../components/Header';
import { getFoodCategories, RecipesFilterFood,
  getApiByAllFoods } from '../services/FetchApiAll';

function Foods({ match: { path } }) {
  const [categories, setCategories] = useState([]);
  const [nameCategoryFilter, setNameCategoryFilter] = useState('');
  const [foodsAll, setFoodsAll] = useState([]);
  const { data: { recipes } } = useContext(RecipesContext);
  const history = useHistory();
  const msg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  // renderiza conforme as condições expecíficas dos requisitos
  const renderRecipies = () => {
    if (!recipes) {
      global.alert(msg);
      return foodsAll;
    }
    if (recipes.length === 1) {
      history.push(`/comidas/${recipes[0].idMeal}`);
    }
    if (recipes.length > 0) return recipes;
    if (recipes.length === 0) return foodsAll;
  };

  useEffect(() => { // faz a requisição pra api de bebidas sem filtros
    async function getFoodsAll() {
      const meals = await getApiByAllFoods();
      setFoodsAll(meals);
    }
    getFoodsAll();
  }, []);

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
      setCategories(categoriesArray);
    }
    ApiCategoriesFood();
  }, []);

  // Requisito 28 - a realizar
  useEffect(() => {
    async function FilterRecipesFood() {
      const meals = await RecipesFilterFood(nameCategoryFilter);
      if (nameCategoryFilter !== '') {
        setFoodsAll(meals);
      }
    }
    FilterRecipesFood();
  }, [nameCategoryFilter]);

  async function handleClick(nameCategory) {
    if (nameCategory !== nameCategoryFilter) {
      setNameCategoryFilter(nameCategory);
    } else {
      const meals = await getApiByAllFoods();
      setFoodsAll(meals);
      setNameCategoryFilter('');
      console.log(meals);
    }
  }

  async function handleClickAll() {
    const meals = await getApiByAllFoods();
    setNameCategoryFilter('');
    setFoodsAll(meals);
  }

  return (
    <div>
      <Header pageTitle="Comidas" hasSearchIcon="active" />
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
      <RecipesCardFood renderRecipies={ () => renderRecipies() } />
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
