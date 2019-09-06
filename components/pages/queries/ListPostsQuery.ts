import { graphql } from 'react-relay';

export const listPostsQuery = graphql`
  query ListPostsQuery($first: Int, $search: String) {
    posts(first: $first, search: $search)
      @connection(key: "ListPosts_posts", filters: []) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          image
          slug
          title
          description
          text
          createdAt
        }
      }
    }
  }
`;
