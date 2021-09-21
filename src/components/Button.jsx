import React from 'react';
import PropTypes from 'prop-types';

function Button({ testid }) {
  return (
    <button type="button" data-testid={ testid }>
      Entrar
    </button>

  );
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
};

export default Button;
