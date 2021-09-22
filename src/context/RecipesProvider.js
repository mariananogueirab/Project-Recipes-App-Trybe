import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [data, setdata] = useState({
    food: [],
    isLoading: false,
  });

  const setSearchFood = (search) => {
    setdata((prevState) => ({ ...prevState, food: search, isLoading: true }));
  };

  const contextValue = {
    data,
    setSearchFood,
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
