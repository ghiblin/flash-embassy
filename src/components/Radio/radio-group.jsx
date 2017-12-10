import React from 'react';
import PropTypes from 'prop-types';

class RadioGroup extends React.Component {
  getChildContext() {
    const { name, selectedValue, onChange } = this.props;
    return {
      radioGroup: {
        name, selectedValue, onChange,
      },
    };
  }

  render() {
    const {
      Component = 'div',
      name,
      selectedValue,
      onChange,
      children,
      ...rest
    } = this.props;

    return <Component {...rest} className="RadioBox">{children}</Component>;
  }
}

RadioGroup.defaultProps = {
  Component: 'div',
};

RadioGroup.propTypes = {
  name: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  Component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
};

RadioGroup.defaultProps = {
  name: '',
  selectedValue: false,
  onChange: null,
};

RadioGroup.childContextTypes = {
  radioGroup: PropTypes.object,
};

export default RadioGroup;
