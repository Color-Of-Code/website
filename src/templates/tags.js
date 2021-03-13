import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Tag from '../components/tag';
import AllTags from '../components/all-tags';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with `;

  return (
    <Layout>
      <h1>
        {tagHeader}
        <Tag tag={tag} />
      </h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter;
          return (
            <li key={path}>
              <Link to={path}>{title}</Link>
            </li>
          );
        })}
      </ul>
      {/*
        This links to a page that does not yet exist.
        We'll come back to it!
      */}
      <AllTags text="All tags" />
    </Layout>
  );
};

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  }).isRequired
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;
