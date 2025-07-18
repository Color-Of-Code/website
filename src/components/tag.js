import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaTag } from 'react-icons/fa';
import { kebabCase } from 'lodash-es';

import '../styles/tags.css';

function Tag({ tag, count }) {
  const showCount = count !== 0;
  return (
    <span className="search-tag">
      <FaTag className="tag" />
      &nbsp;
      {showCount ? (
        <Link to={`/tags/${kebabCase(tag)}/`}>
          {tag} ({count})
        </Link>
      ) : (
        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
      )}
    </span>
  );
}

Tag.propTypes = {
  tag: PropTypes.string,
  count: PropTypes.number
};

Tag.defaultProps = {
  tag: '',
  count: 0
};

export default Tag;
