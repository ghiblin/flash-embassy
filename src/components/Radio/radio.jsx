import React from 'react';
import PropTypes from 'prop-types';

const Radio = ({ value }, { radioGroup }) => {
  const { name, selectedValue, onChange } = radioGroup;
  const optional = {};
  if (selectedValue !== undefined) {
    optional.checked = (value === selectedValue);
  }
  if (typeof onChange === 'function') {
    optional.onChange = onChange.bind(null, value);
  }

  return (
    <input
      {...this.props}
      type="radio"
      name={name}
      {...optional}
    />
  );
};

Radio.propTypes = {
  // eslint-disable-next-line
  value: PropTypes.any,
};

Radio.defaultProps = {
  value: false,
};

Radio.contextTypes = {
  radioGroup: PropTypes.object,
};

export default Radio;
