import { graphql } from 'react-relay';

export const postQuery = graphql`
  query PostQuery($slug: String) {
    postBySlug(slug: $slug) {
      id
      image
      slug
      title
      description
      text
    }
  }
`;
