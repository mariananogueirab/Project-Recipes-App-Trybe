import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, onChange, testid, value, label }) {
  return (
    <div className="container">
      <label htmlFor={ testid }>
        {label}
        <input
          type={ type }
          value={ value }
          data-testid={ testid }
          onChange={ onChange }
          id={ testid }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: undefined,
};

export default Input;
