// import { createRefetchContainer, graphql } from 'react-relay';
// import styled from 'styled-components';
// import { Button } from '@smooth-ui/core-sc';
import { graphql, useRefetch } from 'relay-hooks';

// import withData from '../lib/withData';

// const Title = styled.li`
//   color: #007ea7;
// `;

const fragmentSpec = graphql`
  fragment ListPosts_query on Query
    @argumentDefinitions(search: { type: "String!" }, first: { type: Int }) {
    posts(first: $first, search: $search)
      @connection(key: "ListPosts_posts", filters: []) {
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
`;

const postsQuery = graphql`
  query ListPosts_refetchQuery($first: Int, $search: String) {
    ...ListPosts_query @arguments(first: $first, search: $search)
  }
`;

// @ts-ignore
function ListPosts() {
  const [data, refetch] = useRefetch(fragmentSpec, null);
  const handlerRefetch = () => {
    console.log('====== refetch');
    refetch(
      postsQuery,
      { first: 100, search: '' },
      null,
      () => {
        console.log('Refetch done');
      },
      { force: true }
    );
  };
  console.log('========= data', data);

  return (
    <>
      {/* <ul>
        {query &&
          query.posts &&
          // @ts-ignore
          query.posts.edges.map(({ node }) => (
            <Title key={node.id}>Title: {node.title}</Title>
          ))}
      </ul> */}
      <button onClick={handlerRefetch}>Refetch</button>
    </>
  );
}

export default ListPosts;

// const IndexRefetchContainer = createRefetchContainer(
//   Index,
//   {
//     query: graphql`;
//       fragment ListPosts_query on Query
//         @argumentDefinitions(
//           search: { type: "String!" }
//           first: { type: Int }
//         ) {
//         posts(first: $first, search: $search)
//           @connection(key: "Index_posts", filters: []) {
//           pageInfo {
//             hasNextPage
//             endCursor
//           }
//           edges {
//             node {
//               id
//               title
//               text
//             }
//           }
//         }
//       }
//     `
//   },
//   graphql`
//     query ListPosts_refetchQuery($first: Int, $search: String) {
//       ...ListPosts_query @arguments(first: $first, search: $search)
//     }
//   `
// );

// export default withData(IndexRefetchContainer, {
//   query: graphql`
//     query ListPostsQuery($first: Int, $search: String) {
//       ...ListPosts_query @arguments(first: $first, search: $search)
//     }
//   `,
//   variables: {
//     first: 10,
//     search: ""
//   }
// });
