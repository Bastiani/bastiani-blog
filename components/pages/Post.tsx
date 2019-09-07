import Disqus from 'disqus-react';
import marked from 'marked';
import { BlogJsonLd, NextSeo } from 'next-seo';
import Highlight from 'react-highlight';
import { fetchQuery } from 'react-relay';

import { initEnvironment } from '../../lib/createEnvironment';
import '../../static/css/vs2015.css';
import { PostQueryResponse } from './queries/__generated__/PostQuery.graphql';
import { postQuery } from './queries/PostQuery';

interface IProps {
  postBySlug: PostQueryResponse['postBySlug'];
  relayData: string;
  variables: object;
}

const renderPostText = (text: string) => {
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true
  });
  const postArray = text.split('/$');
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
    {postBySlug && (
      <>
        <h1>{postBySlug.title}</h1>
        <h2>{postBySlug.description}</h2>
        <p>{renderPostText(postBySlug.text)}</p>
      </>
    )}
  </>
);

const Post = (props: IProps) => {
  if (process.browser) {
    const { relayData } = props;

    // @ts-ignore
    const postBySlug = relayData[0][1].data.postBySlug;
    const disqusShortname = 'rafaelbastiani-com';
    const disqusConfig = {
      url: process.browser ? window.location.href : '',
      identifier: postBySlug.id,
      title: postBySlug.title
    };

    return (
      <>
        <NextSeo
          title={postBySlug.title}
          description={postBySlug.description}
          canonical='https://www.canonical.ie/'
          openGraph={{
            url: window.location.href,
            title: postBySlug.title,
            description: postBySlug.description,
            images: [{ url: postBySlug.image }],
            site_name: 'Rafael Campos de Bastiani'
          }}
          twitter={{
            handle: '@RBastiani',
            site: '@RBastiani',
            cardType: 'summary_large_image'
          }}
        />
        <BlogJsonLd
          url='https://www.rafaelbastiani.com'
          title='Rafael Campos de Bastiani'
          images={[postBySlug.image]}
          datePublished={postBySlug.createdAt}
          dateModified={postBySlug.createdAt}
          authorName='Rafael Campos de Bastiani'
          description={postBySlug.description}
        />
        <PostDetails postBySlug={postBySlug} />
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </>
    );
  } else {
    return null;
  }
};

Post.getInitialProps = async ({ query: queryParams }: any) => {
  const variables = { slug: queryParams.slug };
  if (initEnvironment && postQuery) {
    const { environment, relaySSR } = initEnvironment();

    await fetchQuery(environment, postQuery, variables);
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

export default Post;
