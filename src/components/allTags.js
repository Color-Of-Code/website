import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaTags } from 'react-icons/fa';

import '../styles/tags.css';

const AllTags = ({ text }) => (
  <span className="tag">
    <FaTags />
    &nbsp;
    <Link to={'/tags'}>{text}</Link>
  </span>
);

AllTags.propTypes = {
  text: PropTypes.string,
};

AllTags.defaultProps = {
  text: '',
};

export default AllTags;
