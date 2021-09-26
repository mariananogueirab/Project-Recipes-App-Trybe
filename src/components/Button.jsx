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
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: undefined,
  onClick: undefined,
};

export default Button;
