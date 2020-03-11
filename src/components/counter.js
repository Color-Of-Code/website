import React, { useState } from 'react';
import PropTypes from 'prop-types';

const valueStyle = {
  width: '8em',
  display: 'inline-block',
  textAlign: 'center',
};

const Counter = ({ initialvalue }) => {
  const [count, setCount] = useState(initialvalue);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <span>
      <span style={valueStyle}>{count}</span>
      <button onClick={handleDecrement}>-1</button>
      <button onClick={handleIncrement}>+1</button>
    </span>
  );
};

Counter.propTypes = {
  initialvalue: PropTypes.number,
};

Counter.defaultProps = {
  initialvalue: 0,
};

export default Counter;
