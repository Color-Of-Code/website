import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import skull from '../images/wallpaper-skull.jpg';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404 - NOT FOUND</h1>
    <img src={skull} alt="Skull" />
    <div
      style={{
        float: 'right',
      }}
    >
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
