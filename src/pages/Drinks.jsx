import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Drinks({ match: { path } }) {
  return (
    <div>
      <SearchBar path={ path } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
