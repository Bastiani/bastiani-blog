import { fetchQuery, graphql } from 'react-relay';
import initEnvironment from '../../lib/createRelayEnvironment';

const query = graphql`
  query PostQuery($slug: String) {
    postBySlug(slug: $slug) {
      id
      slug
      title
      text
    }
  }
`;

const PostDetails = (postBySlug: any) => (
  <>
    {postBySlug && (
      <>
        <h1>{postBySlug.postBySlug.title}</h1>
        <br />
        {postBySlug.postBySlug.text}
      </>
    )}
  </>
);

// @ts-ignore
function Post({ postBySlug }) {
  return (
    <>
      <PostDetails postBySlug={postBySlug} />
    </>
  );
}

Post.getInitialProps = async ({ query: queryParams }: any) => {
  const environment = initEnvironment();

  const queryProps = await fetchQuery(environment, query, {
    slug: queryParams.slug
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

export default Post;
