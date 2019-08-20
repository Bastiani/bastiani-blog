import Link from 'next/link';
import { createRefetchContainer, graphql } from 'react-relay';
// import styled from 'styled-components';

import withData from '../../lib/withData';

// const Title = styled.li`
//   color: #007ea7;
// `;

// @ts-ignore
function ListPosts({ query }) {
  return (
    <>
      {query &&
        query.posts &&
        // @ts-ignore
        query.posts.edges.map(({ node }) => (
          <div key={node.slug}>
            <Link href={`/post?slug=${node.slug}`} as={`/post/${node.slug}`}>
              <a>Title: {node.title}</a>
            </Link>
            <br />
          </div>
        ))}
    </>
  );
}

const ListPostsRefetchContainer = createRefetchContainer(
  ListPosts,
  {
    query: graphql`
      fragment ListPosts_query on Query
        @argumentDefinitions(
          search: { type: "String!" }
          first: { type: Int }
        ) {
        posts(first: $first, search: $search)
          @connection(key: "ListPosts_posts", filters: []) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              slug
              title
              text
            }
          }
        }
      }
    `
  },
  graphql`
    query ListPosts_refetchQuery($first: Int, $search: String) {
      ...ListPosts_query @arguments(first: $first, search: $search)
    }
  `
);

export default withData(ListPostsRefetchContainer, {
  query: graphql`
    query ListPostsQuery($first: Int, $search: String) {
      ...ListPosts_query @arguments(first: $first, search: $search)
    }
  `,
  variables: {
    first: 100,
    search: ''
  }
});
