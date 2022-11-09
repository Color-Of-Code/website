import React from 'react';
import PropTypes from 'prop-types';
import Tag from './tag';
import { Link } from 'gatsby-link';

const BlogPostHeader = ({ link, title, date, keywords }) => (
  <div className="blog-post-header">
    <h1 className="blog-title">
      {link ? <Link to={link}>{title}</Link> : title}
    </h1>
    <span className="blog-date">{date}</span>
    <div className="blog-tags">
      {keywords.map(tag => {
        return <Tag tag={tag} key={tag} />;
      })}
    </div>
  </div>
);

BlogPostHeader.propTypes = {
  date: PropTypes.string.isRequired,
  keywords: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  title: PropTypes.string.isRequired
};

BlogPostHeader.defaultProps = {
  keywords: [],
  link: null
};

export default BlogPostHeader;
