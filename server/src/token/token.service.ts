import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { UserTokenPayload } from 'src/user/types';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ACCESS_TOKEN_COOKIE_EXPIRES_IN,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_COOKIE_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from 'src/config/constants';

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  extractToken(connectionParams: any): string | null {
    return connectionParams?.token || null;
  }

  validateRefreshToken(token: string): any {
    const refreshTokenSecret = this.configService.get<string>(
      'REFRESH_TOKEN_SECRET',
    );
    try {
      return verify(token, refreshTokenSecret);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token: string): any {
    const accessTokenSecret = this.configService.get<string>(
      'ACCESS_TOKEN_SECRET',
    );
    try {
      return verify(token, accessTokenSecret);
    } catch (error) {
      return null;
    }
  }

  async issueTokens(user: User, response: Response) {
    const payload: Pick<UserTokenPayload, 'username' | 'sub'> = {
      username: user.fullname,
      sub: user.id,
    };

    const accessToken = this.jwtService.sign(
      { ...payload },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_COOKIE_EXPIRES_IN,
    });
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_TOKEN_COOKIE_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      if (!payload) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
      const userExists = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!userExists) {
        throw new NotFoundException('User no longer exists');
      }

      return this.jwtService.sign(
        { username: userExists.fullname, sub: userExists.id },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        },
      );
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  clearTokens(response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
  }
}
