import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import {
  getApiByFirstLetter,
  getApiByName,
  getApiByIngrediente } from '../services/FetchAPI';

function SearchBar() {
  const [selected, setSelected] = useState({
    searchText: '',
    searchRadio: '',
  });

  const { setSearchFood } = useContext(RecipesContext);

  /* lidar com as opçoes de ingredientes e salve no state local */
  const handleChange = ({ target: { name, value } }) => {
    setSelected((prevState) => ({ ...prevState, [name]: value }));
  };

  const text = selected.searchText;
  /* submete o reultado da busca e faz a requisição da api salvando no state local */
  const handleClick = (event) => {
    event.preventDefault();
    switch (selected.searchRadio) {
    case 'ingredient':
      getApiByIngrediente(text).then((response) => (
        setSearchFood(response.meals)
      ));
      break;
    case 'name':
      getApiByName(text).then((response) => (
        setSearchFood(response.meals)
      ));
      break;
    case 'first-letter':
      if (text.length === 1) {
        getApiByFirstLetter(text).then((response) => (
          setSearchFood(response.meals)
        ));
      } else {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      break;
    default:
      break;
    }
  };

  return (
    <form onSubmit={ handleClick }>
      <div>
        <span data-testid="search-top-btn">SearchBar</span>
      </div>

      <input
        type="text"
        name="searchText"
        onChange={ handleChange }
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          id="ingredient"
          type="radio"
          value="ingredient"
          name="searchRadio"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          type="radio"
          value="name"
          name="searchRadio"
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          id="first-letter"
          type="radio"
          value="first-letter"
          name="searchRadio"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        id="btn-search"
        type="submit"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
