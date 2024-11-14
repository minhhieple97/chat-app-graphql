import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  LoginResponse,
  RegisterResponse,
  CurrentUserResponse,
  RefreshTokenResponse,
} from './types';
import { LoginDto, RegisterDto } from './dto';
import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLErrorFilter } from 'src/common/filters/custom-exception.filter';
import { GraphqlAuthGuard } from './guard/graphql-auth.guard';
import { UserTokenPayload } from '../user/types';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    const { refreshToken, accessToken } = await this.authService.register(
      registerDto,
      context.res,
    );
    return { refreshToken, accessToken, success: true };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    const { refreshToken, accessToken } = await this.authService.login(
      loginDto,
      context.res,
    );
    return { refreshToken, accessToken, success: true };
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => CurrentUserResponse)
  @UseGuards(GraphqlAuthGuard)
  async getCurrentUser(@Context() context: { req: Request }) {
    const user = context.req['user'] as UserTokenPayload;
    const currentUser = await this.authService.getCurrentUser(user.sub);
    return {
      user: currentUser,
      success: true,
    };
  }
}
