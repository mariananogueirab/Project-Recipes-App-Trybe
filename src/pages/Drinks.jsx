import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipesCardDrink from '../components/RecipesCardDrink';

function Drinks({ match: { path }, history }) {
  const { data: { recipes } } = useContext(RecipesContext);

  const redirectRecipies = useCallback(() => {
    if (recipes.length === 1) {
      history.push(`/bebidas/${recipes[0].idDrink}`);
    }
    return <RecipesCardDrink />;
  }, [recipes, history]);

  useEffect(() => {
    redirectRecipies();
  }, [redirectRecipies]);

  return (
    <div>
      <SearchBar path={ path } />
      {
        redirectRecipies()
      }
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  history: PropTypes.objectOf(String),
}.isRequired;

export default Drinks;
