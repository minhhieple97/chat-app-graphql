import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenService } from 'src/token/token.service';
import { ACCESS_TOKEN_COOKIE_EXPIRES_IN } from 'src/config/constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const newAccessToken = await this.tokenService.refreshToken(refreshToken);

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_COOKIE_EXPIRES_IN,
    });
    return {
      accessToken: newAccessToken,
    };
  }

  async login(loginDto: LoginDto, response: Response) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new BadRequestException({
        invalidCredentials: 'Invalid credentials',
      });
    }
    return this.tokenService.issueTokens(user, response);
  }

  async register(registerDto: RegisterDto, response: Response) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });
    if (existingUser) {
      throw new BadRequestException({ email: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        fullname: registerDto.fullname,
        password: hashedPassword,
        email: registerDto.email,
      },
    });
    return this.tokenService.issueTokens(user, response);
  }

  async logout(response: Response) {
    this.tokenService.clearTokens(response);
    return 'Successfully logged out';
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async getCurrentUser(
    userId: number,
  ): Promise<
    Pick<
      User,
      'id' | 'email' | 'fullname' | 'createdAt' | 'updatedAt' | 'avatarUrl'
    >
  > {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
