import React from 'react';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  const initialValue = {};

  return (
    <DetailsContext.Provider value={ initialValue }>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
