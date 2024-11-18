/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Chatroom = {
  __typename?: 'Chatroom';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CurrentUserResponse = {
  __typename?: 'CurrentUserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: User;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  chatroom?: Maybe<Chatroom>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToChatroom: Chatroom;
  createChatroom: Chatroom;
  deleteChatroom: Scalars['String']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: LoginResponse;
  logout: Scalars['String']['output'];
  refreshToken: RefreshTokenResponse;
  register: RegisterResponse;
  sendMessage: Message;
  updateAvatar: User;
  updateUser: User;
  userStartedTypingMutation: User;
  userStoppedTypingMutation: User;
};


export type MutationAddUsersToChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']>;
};


export type MutationCreateChatroomArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationSendMessageArgs = {
  chatroomId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpdateAvatarArgs = {
  base64Image: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUserStartedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationUserStoppedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getChatroomsForUser: Array<Chatroom>;
  getCurrentUser: CurrentUserResponse;
  getMessagesForChatroom: Array<Message>;
  getUser: UserResponse;
  getUsersOfChatroom: Array<User>;
  searchUsers: UsersResponse;
};


export type QueryGetChatroomsForUserArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryGetMessagesForChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QueryGetUsersOfChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QuerySearchUsersArgs = {
  searchTerm: Scalars['String']['input'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage?: Maybe<Message>;
  userStartedTyping?: Maybe<User>;
  userStoppedTyping?: Maybe<User>;
};


export type SubscriptionNewMessageArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type SubscriptionUserStartedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type SubscriptionUserStoppedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateUserInput = {
  avatarData?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: User;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  success: Scalars['Boolean']['output'];
  users: Array<User>;
};

export type AddUsersToChatroomMutationVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type AddUsersToChatroomMutation = { __typename?: 'Mutation', addUsersToChatroom: { __typename?: 'Chatroom', name?: string | null, id?: string | null } };

export type CreateChatroomMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateChatroomMutation = { __typename?: 'Mutation', createChatroom: { __typename?: 'Chatroom', name?: string | null, id?: string | null } };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken?: string | null, success: boolean, message?: string | null } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logout: string };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', accessToken: string } };

export type RegisterUserMutationVariables = Exact<{
  fullname: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', accessToken: string, refreshToken?: string | null, success: boolean, message?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  fullname: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id?: number | null, fullname: string, avatarUrl?: string | null } };

export type GetChatroomsForUserQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetChatroomsForUserQuery = { __typename?: 'Query', getChatroomsForUser: Array<{ __typename?: 'Chatroom', id?: string | null, name?: string | null }> };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'CurrentUserResponse', success: boolean, user: { __typename?: 'User', id?: number | null, fullname: string, email: string, avatarUrl?: string | null, createdAt: any, updatedAt: any } } };

export type GetMessagesForChatroomQueryVariables = Exact<{
  chatroomId: Scalars['Float']['input'];
}>;


export type GetMessagesForChatroomQuery = { __typename?: 'Query', getMessagesForChatroom: Array<{ __typename?: 'Message', id?: string | null, content?: string | null, imageUrl?: string | null, createdAt?: any | null, user?: { __typename?: 'User', id?: number | null, fullname: string, email: string, avatarUrl?: string | null } | null, chatroom?: { __typename?: 'Chatroom', id?: string | null, name?: string | null } | null }> };

export type SearchUsersQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'UsersResponse', success: boolean, users: Array<{ __typename?: 'User', id?: number | null, fullname: string, email: string, avatarUrl?: string | null, createdAt: any }> } };


export const AddUsersToChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUsersToChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUsersToChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddUsersToChatroomMutation, AddUsersToChatroomMutationVariables>;
export const CreateChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateChatroomMutation, CreateChatroomMutationVariables>;
export const LoginUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogoutUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutUserMutation, LogoutUserMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"registerInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fullname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fullname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullname"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetChatroomsForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChatroomsForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getChatroomsForUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetChatroomsForUserQuery, GetChatroomsForUserQueryVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetMessagesForChatroomDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagesForChatroom"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMessagesForChatroom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatroomId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatroomId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chatroom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetMessagesForChatroomQuery, GetMessagesForChatroomQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullname"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Chatroom = {
  __typename?: 'Chatroom';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CurrentUserResponse = {
  __typename?: 'CurrentUserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: User;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  chatroom?: Maybe<Chatroom>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUsersToChatroom: Chatroom;
  createChatroom: Chatroom;
  deleteChatroom: Scalars['String']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: LoginResponse;
  logout: Scalars['String']['output'];
  refreshToken: RefreshTokenResponse;
  register: RegisterResponse;
  sendMessage: Message;
  updateAvatar: User;
  updateUser: User;
  userStartedTypingMutation: User;
  userStoppedTypingMutation: User;
};


export type MutationAddUsersToChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
  userIds: Array<Scalars['Float']['input']>;
};


export type MutationCreateChatroomArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginDto;
};


export type MutationRegisterArgs = {
  registerInput: RegisterDto;
};


export type MutationSendMessageArgs = {
  chatroomId: Scalars['Float']['input'];
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['Upload']['input']>;
};


export type MutationUpdateAvatarArgs = {
  base64Image: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUserStartedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type MutationUserStoppedTypingMutationArgs = {
  chatroomId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getChatroomsForUser: Array<Chatroom>;
  getCurrentUser: CurrentUserResponse;
  getMessagesForChatroom: Array<Message>;
  getUser: UserResponse;
  getUsersOfChatroom: Array<User>;
  searchUsers: UsersResponse;
};


export type QueryGetChatroomsForUserArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryGetMessagesForChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QueryGetUsersOfChatroomArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type QuerySearchUsersArgs = {
  searchTerm: Scalars['String']['input'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type RegisterDto = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  accessToken: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage?: Maybe<Message>;
  userStartedTyping?: Maybe<User>;
  userStoppedTyping?: Maybe<User>;
};


export type SubscriptionNewMessageArgs = {
  chatroomId: Scalars['Float']['input'];
};


export type SubscriptionUserStartedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type SubscriptionUserStoppedTypingArgs = {
  chatroomId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateUserInput = {
  avatarData?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  user: User;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  success: Scalars['Boolean']['output'];
  users: Array<User>;
};
