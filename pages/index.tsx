import { createRefetchContainer, graphql } from 'react-relay';
import styled from 'styled-components';

import withData from '../lib/withData';

const Title = styled.li`
  color: #007EA7;
`;

// @ts-ignore
function Index({ query }) {
  return (
    <div>
      <ul>
        {query && query.posts && (
          // @ts-ignore
          query.posts.edges.map(({ node }) => <Title key={node.id}>Title: {node.title}</Title>)
        )}
      </ul>
    </div>
  );
}

const IndexRefetchContainer = createRefetchContainer(
  Index,
  {
    query: graphql`
      fragment pages_query on Query
        @argumentDefinitions(
          search: { type: "String!" }
          first: { type: Int }
        ) {
        posts(first: $first, search: $search)
          @connection(key: "Index_posts", filters: []) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              text
            }
          }
        }
      }
    `,
  },
  graphql`
    query pages_refetchQuery($first: Int, $search: String) {
      ...pages_query @arguments(first: $first, search: $search)
    }
  `,
);

export default withData(IndexRefetchContainer, {
  query: graphql`
    query pagesQuery($first: Int, $search: String) {
      ...pages_query @arguments(first: $first, search: $search)
    }
  `,
  variables: {
    first: 10,
    search: '',
  },
});
