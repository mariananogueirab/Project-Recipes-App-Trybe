import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

function Drinks({ match: { path } }) {
  return (

    <SearchBar path={ path } />

  );
}

Drinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
