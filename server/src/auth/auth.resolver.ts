import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, RegisterResponse } from './types';
import { LoginDto, RegisterDto } from './dto';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { GraphQLErrorFilter } from 'src/common/filters/custom-exception.filter';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ) {
    const { user, refreshToken, accessToken } = await this.authService.register(
      registerDto,
      context.res,
    );
    return { user, refreshToken, accessToken, success: true };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginDto: LoginDto,
    @Context() context: { res: Response },
  ) {
    const { user, refreshToken, accessToken } = await this.authService.login(
      loginDto,
      context.res,
    );
    return { user, refreshToken, accessToken, success: true };
  }

  @Mutation(() => String)
  async logout(@Context() context: { res: Response }) {
    return this.authService.logout(context.res);
  }

  @Mutation(() => String)
  async refreshToken(@Context() context: { req: Request; res: Response }) {
    try {
      return this.authService.refreshToken(context.req, context.res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
