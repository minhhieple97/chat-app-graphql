import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      success
      user {
        id
        fullname
        email
        avatarUrl
        createdAt
        updatedAt
      }
    }
  }
`;
