import {
  ApolloClient,
  InMemoryCache,
  Observable,
  ApolloLink,
  split,
  HttpLink,
} from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { onError } from '@apollo/client/link/error';
import { useUserStore } from './stores/userStore';
import { getMainDefinition } from '@apollo/client/utilities';
import { tokenService } from './features/auth/services/token-service';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

loadErrorMessages();
loadDevMessages();

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  }),
);
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;

  for (const err of graphQLErrors) {
    if (err.extensions?.code === 'UNAUTHENTICATED') {
      return new Observable((observer) => {
        tokenService
          .refreshToken()
          .then((token) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            operation.setContext((previousContext: any) => ({
              headers: {
                ...previousContext.headers,
                authorization: `Bearer ${token}`,
              },
            }));
            const forward$ = forward(operation);
            forward$.subscribe(observer);
          })
          .catch((error) => {
            useUserStore.getState().resetUser();
            observer.error(error);
          });
      });
    }

    if (err.message === 'Refresh token not found') {
      useUserStore.getState().resetUser();
    }
  }
});

const uploadLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  headers: {
    'apollo-require-preflight': 'true',
  },
});
const link = split(
  // Split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  ApolloLink.from([errorLink, uploadLink]),
);
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({}),
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  link,
});
