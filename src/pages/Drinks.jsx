import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import RecipesCardDrink from '../components/RecipesCardDrink';
import Header from '../components/Header';

function Drinks({ match: { path } }) {
  return (
    <div>
      <Header pageTitle="Bebidas" hasSearchIcon="active" />
      <SearchBar path={ path } />
      <RecipesCardDrink />

      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
}.isRequired;

export default Drinks;
