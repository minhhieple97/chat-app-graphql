import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation UpdateUser($fullname: String!, $file: Upload) {
    updateUser(input: { fullname: $fullname }, file: $file) {
      id
      fullname
      avatarUrl
    }
  }
`;
