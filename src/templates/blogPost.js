import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Layout from '../components/layout';

import '../styles/blog-post.css';
import '../styles/blog-charts.css';

import rehypeReact from 'rehype-react';
import Counter from '../components/counter';
import Hotkey from '../components/hotkey';
import SEO from '../components/seo';
import BlogPostHeader from '../components/blog-post-header';

function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, htmlAst } = markdownRemark;
  const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
      interactivecounter: Counter,
      hk: Hotkey,
    },
  }).Compiler;

  return (
    <Layout>
      <SEO title={frontmatter.title} keywords={frontmatter.tags} />
      <div className="blog-post-container">
        <div className="blog-post">
          <BlogPostHeader
            title={frontmatter.title}
            date={frontmatter.date}
            keywords={frontmatter.tags}
          ></BlogPostHeader>
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
