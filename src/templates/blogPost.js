import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from '../components/layout';

import '../styles/blog-post.css';
import rehypeReact from 'rehype-react';
import Counter from '../components/counter';
import Hotkey from '../components/hotkey';
import Tag from '../components/tag';

function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, htmlAst } = markdownRemark;
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      'interactive-counter': Counter,
      hk: Hotkey,
    },
  }).Compiler;

  return (
    <Layout>
      <div className="blog-post-container">
        <div className="blog-post">
          <div className="blog-post-header">
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            <div className="blog-tags">
              {frontmatter.tags.map(tag => {
                return <Tag tag={tag} key={tag} />;
              })}
            </div>
          </div>
          <div className="blog-post-content">{renderAst(htmlAst)}</div>
        </div>
      </div>
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Template;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`;
