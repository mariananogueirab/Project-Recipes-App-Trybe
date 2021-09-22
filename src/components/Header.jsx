import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Header({ pageTitle, hasSearchIcon }) {
  // estado para verificar se ao clicar no ícone, o mesmo é transformado em um input
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const { handleChangeSearch } = useContext(RecipesContext);

  const searchBarAsInput = (<input
    type="text"
    data-testid="search-input"
    name="searchText"
    onChange={ handleChangeSearch }
  />);

  const renderSearchBarIcon = () => {
    if (!hasSearchIcon) return;

    return (
      <button
        type="button"
        onClick={ () => setActiveSearchBar(!activeSearchBar) }
      >
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>
    );
  };

  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="user profile icon"
          data-testid="profile-top-btn"
        />
      </Link>
      <h2 data-testid="page-title">{ pageTitle }</h2>
      { renderSearchBarIcon() }
      { activeSearchBar ? searchBarAsInput : null }
    </header>
  );
}

export default Header;

Header.propTypes = {
  pageTitle: PropTypes.string,
  hasSearchIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}.isRequired;
