import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardFood from '../components/RecipesCardFood';
import Header from '../components/Header';

function Foods({ match: { path } }) {
  return (
    <div>
      <Header pageTitle="Comidas" hasSearchIcon="active" />
      <SearchBar path={ path } />
      <RecipesCardFood />
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
