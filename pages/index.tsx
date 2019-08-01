import Head from 'next/head';
import { createRefetchContainer, graphql } from 'react-relay';

// import createQueryRenderer from '../relay/createQueryRenderer';
import withData from '../relay/withData';

// @ts-ignore
function Index({ query }) {
  return (
    <div>
      <Head>
        <title>Bastiani Blog</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ul>
        {query && query.posts && (
          // @ts-ignore
          query.posts.edges.map(({ node }) => <li key={node.id}>Title: {node.title}</li>)
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
