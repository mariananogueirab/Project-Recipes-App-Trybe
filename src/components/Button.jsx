import React from 'react';
import PropTypes from 'prop-types';

function Button({ testid, disabled, onClick }) {
  return (
    <button
      type="submit"
      data-testid={ testid }
      disabled={ disabled }
      onClick={ onClick }
    >
      Entrar
    </button>

  );
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
