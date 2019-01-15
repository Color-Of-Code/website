import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404 - NOT FOUND</h1>

    <Img fixed={data.file.childImageSharp.fixed} />
    <div
      style={{
        float: 'right',
      }}
    >
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default NotFoundPage;
export const query = graphql`
  query {
    file(relativePath: { eq: "wallpaper-skull.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 640, height: 480) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
