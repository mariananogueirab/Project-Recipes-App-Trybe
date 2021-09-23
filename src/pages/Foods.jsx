import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipesCardFood from '../components/RecipesCardFood';
import Header from '../components/Header';

function Foods({ match: { path } }) {
  const { data: { recipes } } = useContext(RecipesContext);

  const history = useHistory();

  const redirectRecipies = useCallback(() => {
    if (recipes.length === 1) {
      history.push(`/comidas/${recipes[0].idMeal}`);
    } else {
      return <RecipesCardFood />;
    }/*  else if (recipes === []) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } */
  }, [recipes, history]);

  useEffect(() => {
    redirectRecipies();
  }, [redirectRecipies]);

  return (
    <div>
      <Header pageTitle="Comidas" hasSearchIcon="active" />
      <SearchBar path={ path } />
      {
        redirectRecipies()
      }
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
