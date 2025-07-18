module.exports = {
  trailingSlash: 'never',
  siteMetadata: {
    title: 'Color Of Code',
    description: 'Color Of Code - website about software and programming',
    author: '@jdehaan',
    siteUrl: 'https://github.com/Color-Of-Code/website'
  },
  plugins: [
    'gatsby-plugin-eslint',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#000',
        theme_color: '#000',
        display: 'minimal-ui',
        icon: 'src/images/logo.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-flowchart',
            // see more details on https://github.com/adrai/flowchart.js
            options: {
              fill: 'white',
              'line-color': 'black'
            }
          },
          {
            resolve: 'gatsby-remark-draw',
            options: {
              dot: {
                edgeAttributes: {
                  arrowtail: 'empty',
                  arrowhead: 'empty'
                }
              },
              bob: {
                fontFamily: 'verdana'
              },
              mermaid: {
                theme: 'forest',
                backgroundColor: 'transparent'
              }
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: '${__dirname}/static/files'
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 480
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          {
            resolve: 'gatsby-remark-embellish-links'
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ]
};
