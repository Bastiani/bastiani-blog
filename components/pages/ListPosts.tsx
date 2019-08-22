import Link from 'next/link';
import { fetchQuery, graphql } from 'react-relay';

import initEnvironment from '../../lib/createRelayEnvironment';

const listPostsQuery = graphql`
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
          slug
          title
          text
        }
      }
    }
  }
`;

// @ts-ignore
function ListPosts(props) {
  const { posts } = props;
  return (
    <>
      {posts &&
        posts.edges.map(({ node }: any) => (
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

ListPosts.getInitialProps = async () => {
  const environment = initEnvironment();

  const queryProps = await fetchQuery(environment, listPostsQuery, {
    first: 100
  });

  const queryRecords = environment
    .getStore()
    .getSource()
    .toJSON();

  return {
    ...queryProps,
    queryRecords
  };
};

export default ListPosts;
