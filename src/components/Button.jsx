import React from 'react';
import PropTypes from 'prop-types';

function Button({ testid, disabled }) {
  return (
    <button type="submit" data-testid={ testid } disabled={ disabled }>
      Entrar
    </button>

  );
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
