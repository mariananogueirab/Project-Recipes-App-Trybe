import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DetailsContext from './DetailsContext';

function DetailsProvider({ children }) {
  

  return (
    <DetailsContext.Provider value={}>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DetailsProvider;
