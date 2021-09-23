import React from 'react';
import PropTypes from 'prop-types';

function Button({ testid, disabled, onClick, label }) {
  return (
    <button
      type="submit"
      data-testid={ testid }
      disabled={ disabled }
      onClick={ onClick }
    >
      {label}
    </button>

  );
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
