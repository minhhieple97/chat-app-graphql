import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($fullname: String!, $email: String!, $password: String!) {
    register(registerInput: { fullname: $fullname, email: $email, password: $password }) {
      accessToken
      refreshToken
      success
      message
    }
  }
`;
