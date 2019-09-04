import marked from 'marked';
import Link from 'next/link';
import Highlight from 'react-highlight';
import { fetchQuery } from 'react-relay';

import initEnvironment from '../../lib/createRelayEnvironment';
import '../../static/css/vs2015.css';
import { postQuery } from './queries/PostQuery';

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
        <Highlight key={index} language='javascript' innerHtml>
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
    <Link href='/'>
      <a>TESTE</a>
    </Link>
    {postBySlug && (
      <>
        <h1>{postBySlug.title}</h1>
        <br />
        <h3>{postBySlug.description}</h3>
        <br />
        {renderPostText(postBySlug.text)}
      </>
    )}
  </>
);

// @ts-ignore
const Post = ({ postBySlug }) => (
  <>
    <PostDetails postBySlug={postBySlug} />
  </>
);

Post.getInitialProps = async ({ query: queryParams }: any) => {
  const environment = initEnvironment();

  const queryProps = await fetchQuery(environment, postQuery, {
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
