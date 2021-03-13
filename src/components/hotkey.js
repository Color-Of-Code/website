import React from 'react';
import PropTypes from 'prop-types';

const hotkeyStyle = {
  fontSize: 'medium',
  whiteSpace: 'nowrap'
};

const hotkeyButtonStyle = {
  marginRight: '2px',
  borderRadius: '15px'
};

class Hotkey extends React.Component {
  static defaultProps = {
    keys: ''
  };

  state = {
    value: String(this.props.keys)
  };

  render() {
    var ks = this.state.value.split(' + ').map(item => item.trim());
    return (
      <span style={hotkeyStyle}>
        {ks.map((k, i) => {
          return (
            <button style={hotkeyButtonStyle} key={i}>
              {k}
            </button>
          );
        })}
      </span>
    );
  }
}

Hotkey.propTypes = {
  keys: PropTypes.string
};

Hotkey.defaultProps = {
  keys: ''
};

export default Hotkey;
