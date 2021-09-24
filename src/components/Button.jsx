import React from 'react';
import PropTypes from 'prop-types';

function Button({ testid, disabled, onClick, label, style }) {
  return (
    <button
      type="submit"
      data-testid={ testid }
      disabled={ disabled }
      onClick={ onClick }
      style={ style }
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
  style: PropTypes.objectOf(String),
};

Button.defaultProps = {
  disabled: undefined,
  onClick: undefined,
  style: {},
};

export default Button;
