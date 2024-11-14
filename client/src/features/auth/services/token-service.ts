import { client } from '@/apolloClient';
import { REFRESH_TOKEN } from '@/graphql/mutations/RefreshToken';
import { RefreshTokenMutation } from '@/gql/graphql';

class TokenService {
  private static instance: TokenService;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  private constructor() {}

  static getInstance(): TokenService {
    if (!this.instance) {
      this.instance = new TokenService();
    }
    return this.instance;
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  addRefreshSubscriber(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  async refreshToken(): Promise<string> {
    try {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        const { data } = await client.mutate<RefreshTokenMutation>({
          mutation: REFRESH_TOKEN,
        });

        const newToken = data?.refreshToken.accessToken;
        if (!newToken) throw new Error('Failed to refresh token');

        this.onRefreshed(newToken);
        return newToken;
      }

      return new Promise((resolve) => {
        this.addRefreshSubscriber((token: string) => {
          resolve(token);
        });
      });
    } finally {
      this.isRefreshing = false;
    }
  }
}

export const tokenService = TokenService.getInstance();
