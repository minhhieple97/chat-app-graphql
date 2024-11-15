/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation LogoutUser {\n    logout\n  }\n": types.LogoutUserDocument,
    "\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation RegisterUser($fullname: String!, $email: String!, $password: String!) {\n    register(registerInput: { fullname: $fullname, email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation UpdateUser($fullname: String!) {\n    updateUser(input: { fullname: $fullname }) {\n      id\n      fullname\n      avatarUrl\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query GetCurrentUser {\n    getCurrentUser {\n      success\n      user {\n        id\n        fullname\n        email\n        avatarUrl\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation LoginUser($email: String!, $password: String!) {\n    login(loginInput: { email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LogoutUser {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutUser {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken {\n    refreshToken {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RegisterUser($fullname: String!, $email: String!, $password: String!) {\n    register(registerInput: { fullname: $fullname, email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($fullname: String!, $email: String!, $password: String!) {\n    register(registerInput: { fullname: $fullname, email: $email, password: $password }) {\n      accessToken\n      refreshToken\n      success\n      message\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUser($fullname: String!) {\n    updateUser(input: { fullname: $fullname }) {\n      id\n      fullname\n      avatarUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($fullname: String!) {\n    updateUser(input: { fullname: $fullname }) {\n      id\n      fullname\n      avatarUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentUser {\n    getCurrentUser {\n      success\n      user {\n        id\n        fullname\n        email\n        avatarUrl\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentUser {\n    getCurrentUser {\n      success\n      user {\n        id\n        fullname\n        email\n        avatarUrl\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;