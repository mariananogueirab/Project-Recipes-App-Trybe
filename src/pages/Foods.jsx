import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import RecipesCardFood from '../components/RecipesCardFood';

function Foods({ match: { path }, history }) {
  const { data: { recipes }, isLoading } = useContext(RecipesContext);

  const redirectRecipies = useCallback(() => {
    if (recipes.length === 1) {
      history.push(`/comidas/${recipes[0].idMeal}`);
    } else if (recipes.length > 1) {
      return <RecipesCardFood />;
    } else if (recipes.length < 1 && isLoading) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    console.log(recipes);
  }, [recipes, history, isLoading]);

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

Foods.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  history: PropTypes.objectOf(String),
}.isRequired;

export default Foods;
