import React from 'react';
import PropTypes from 'prop-types';

const quoteBoxStyle = {
  width: '50vw',
  background: '#222',
  borderRadius: '10px',
  padding: '10px',
  marginBottom: '0.5em',
  fontFamily: 'Comic Sans MS',
};
const quoteStyle = {
  textAlign: 'center',
  fontSize: '1.2rem',
  color: 'white',
};
const authorStyle = {
  textAlign: 'right',
  fontSize: '0.9rem',
  color: 'yellow',
};

const Quote = ({ author, children }) => {
  return (
    <div style={quoteBoxStyle}>
      <div style={quoteStyle}>{children}</div>
      <div style={authorStyle}>- {author} -</div>
    </div>
  );
};

Quote.propTypes = {
  children: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

Quote.defaultProps = {};

export default Quote;
