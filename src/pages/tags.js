import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Tag from '../components/tag';

class SearchableTagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTags: props.tags,
      displayedTags: props.tags,
    };
  }

  searchHandler = event => {
    let searchQuery = event.target.value.toLowerCase();
    var filteredTags = this.state.allTags.filter(el => {
      let searchValue = el.fieldValue.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    this.setState({
      displayedTags: filteredTags,
    });
  };

  render() {
    let tags = this.state.displayedTags;
    return (
      <div className="searchable-tag-list">
        <div className="search">
          <input type="text" className="search" onChange={this.searchHandler} />
        </div>
        <div className="tags">
          {tags.map(tag => (
            <span key={tag.fieldValue}>
              <Tag tag={tag.fieldValue} count={tag.totalCount} />
            </span>
          ))}
        </div>
      </div>
    );
  }
}

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <div className="tags">
      <Helmet title={title} />
      <h1>Tags</h1>
      <SearchableTagList tags={group} />
    </div>
  </Layout>
);

SearchableTagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      fieldValue: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
    }).isRequired
  ),
};

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default TagsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
