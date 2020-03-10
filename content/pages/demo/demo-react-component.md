---
published: true
path: "/demo/test-react"
date: "2020-03-10"
title: "Test React"
tags: ["demo", "test", "react", "react-hooks"]
---

## Test

Test inlining a react component inside markdown.

### Embedded Counter component

<InteractiveCounter></InteractiveCounter>

### Source

```js
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Counter = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);

  return (
    <span>
      <strong style={{ flex: '1 1' }}>{count}</strong>
      <button onClick={handleDecrement}>-1</button>
      <button onClick={handleIncrement}>+1</button>
    </span>
  );
};

Counter.propTypes = {
  initialValue: PropTypes.number,
};

Counter.defaultProps = {
  initialValue: 0,
};

export default Counter;
```
