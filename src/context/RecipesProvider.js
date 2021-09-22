import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setdata] = useState({
    recipes: [],
    isLoading: false,
  });

  const setSearchFood = (search) => {
    setdata((prevState) => ({ ...prevState, recipes: search, isLoading: true }));
  };

  const [selected, setSelected] = useState({
    searchText: '',
    searchRadio: '',
  });

  const handleChangeSearch = ({ target: { name, value } }) => {
    setSelected((prevState) => ({ ...prevState, [name]: value }));
  };

  const contextValue = {
    data,
    selected,
    setSearchFood,
    handleChangeSearch,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
