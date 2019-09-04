import { graphql } from 'react-relay';

export const postQuery = graphql`
  query PostQuery($slug: String) {
    postBySlug(slug: $slug) {
      id
      slug
      title
      description
      text
    }
  }
`;
