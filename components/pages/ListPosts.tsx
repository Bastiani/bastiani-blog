import Link from 'next/link';
import { fetchQuery, QueryRenderer } from 'react-relay';

import {
  createEnvironment,
  initEnvironment
} from '../../lib/createEnvironment';
import { formatDate } from '../../utils/formatDate';
import { ListPostsQueryResponse } from './queries/__generated__/ListPostsQuery.graphql';
import { listPostsQuery } from './queries/ListPostsQuery';
import { LinkContentStyled, LinkWrapperStyled } from './template/layout';
interface IProps {
  posts: ListPostsQueryResponse['posts'];
  relayData: string;
  variables: object;
}

const ListPosts = (props: IProps) => {
  const { relayData, variables } = props;
  const environment = createEnvironment(
    relayData,
    JSON.stringify({
      // @ts-ignore
      queryID: undefined,
      variables
    })
  );

  return process.browser ? (
    <QueryRenderer
      environment={environment}
      // @ts-ignore
      query={listPostsQuery}
      variables={variables}
      render={({ error, props: queryProps }: any) => {
        if (error) {
          return <div>{error.message}</div>;
        }
        // @ts-ignore
        else if (queryProps) {
          const { posts } = queryProps;
          return posts.edges.map(({ node }: any) => (
            <LinkWrapperStyled key={node.slug}>
              <Link href={`/post?slug=${node.slug}`} as={`/post/${node.slug}`}>
                <a>
                  <section>
                    <LinkContentStyled>
                      <time>{formatDate(node.createdAt)}</time>
                      <h1>{node.title}</h1>
                      <h2>{node.description}</h2>
                    </LinkContentStyled>
                  </section>
                </a>
              </Link>
              <hr />
            </LinkWrapperStyled>
          ));
        }
        return <div>Loading</div>;
      }}
    />
  ) : null;
};

ListPosts.getInitialProps = async () => {
  const variables = {};
  if (initEnvironment && listPostsQuery) {
    const { environment, relaySSR } = initEnvironment();

    await fetchQuery(environment, listPostsQuery, variables);
    const relayData = await relaySSR.getCache();

    return {
      variables,
      relayData
    };
  }
  return {
    variables
  };
};

export default ListPosts;
