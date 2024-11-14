import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation UpdateUser($fullname: String!) {
    updateUser(input: { fullname: $fullname }) {
      id
      fullname
      avatarUrl
    }
  }
`;
