import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';

function Foods({ match: { path } }) {
  return (
    <div>
      <SearchBar path={ path } />
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Foods;
