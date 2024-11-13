import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $fullname: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        fullname: $fullname
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      accessToken
      refreshToken
      success
      message
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
