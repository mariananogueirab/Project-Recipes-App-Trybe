import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrinks from '../services/FetchApiDrinks';
import FetchApiFoods from '../services/FetchApiFoods';

function SearchBar({ path }) {
  const { handleChangeSearch } = useContext(RecipesContext);
  const {
    selected: { searchText, searchRadio },
    setSearchRecipes } = useContext(RecipesContext);
  /* submete o reultado da busca e faz a requisição da api salvando no state global */
  const handleClick = (event) => {
    event.preventDefault();

    if (path === '/comidas') {
      FetchApiFoods(searchText, searchRadio, setSearchRecipes);
    } else if (path === '/bebidas') {
      FetchApiDrinks(searchText, searchRadio, setSearchRecipes);
    }
  };

  return (
    <form onSubmit={ handleClick }>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          id="ingredient"
          type="radio"
          value="ingredient"
          name="searchRadio"
          onChange={ handleChangeSearch }
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
          onChange={ handleChangeSearch }
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
          onChange={ handleChangeSearch }
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

SearchBar.propTypes = {
  path: PropTypes.string.isRequired,
};

export default SearchBar;
