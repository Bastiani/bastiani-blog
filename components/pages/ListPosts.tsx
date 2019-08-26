import Link from 'next/link';
import { fetchQuery, graphql } from 'react-relay';

import initEnvironment from '../../lib/createRelayEnvironment';
import { LinkContentStyled, LinkWrapperStyled } from './template/layout';

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
          description
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
    // @ts-ignore
    <>
      {posts &&
        posts.edges.map(({ node }: any) => (
          <LinkWrapperStyled key={node.slug}>
            <Link href={`/post?slug=${node.slug}`} as={`/post/${node.slug}`}>
              <a>
                <section>
                  <LinkContentStyled>
                    <h1>{node.title}</h1>
                    <h2>{node.description}</h2>
                  </LinkContentStyled>
                </section>
              </a>
            </Link>
            <hr />
          </LinkWrapperStyled>
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
