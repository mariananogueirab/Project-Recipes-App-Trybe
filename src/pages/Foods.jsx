import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

function Foods({ match: { path } }) {
  return (

    <SearchBar path={ path } />

  );
}

Foods.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Foods;
