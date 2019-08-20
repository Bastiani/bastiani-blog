import marked from 'marked';
import Highlight from 'react-highlight';
import { fetchQuery, graphql } from 'react-relay';

import initEnvironment from '../../lib/createRelayEnvironment';
import './vs2015.css';

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

const renderPostText = (text: string) => {
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true
  });
  const postArray = text.split('$');
  return postArray.map((post, index) => {
    if (post.includes('code')) {
      return (
        // @ts-ignore
        <Highlight key={index} language="javascript">
          {post.replace('code', '')}
        </Highlight>
      );
    }
    return (
      <div key={index} dangerouslySetInnerHTML={{ __html: marked(post) }} />
    );
  });
};

const PostDetails = ({ postBySlug }: any) => (
  <>
    {postBySlug && (
      <>
        <h1>{postBySlug.title}</h1>
        <br />
        {renderPostText(postBySlug.text)}
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
