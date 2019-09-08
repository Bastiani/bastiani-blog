import Link from 'next/link';
import { fetchQuery } from 'react-relay';

import { initEnvironment } from '../../lib/createEnvironment';
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
  const { relayData } = props;
  // @ts-ignore
  const posts = relayData[0][1].data.posts;

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
