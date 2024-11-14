import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.login(
      loginDto,
      response,
    );
    return { refreshToken, accessToken, success: true };
  }

  @Post('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(request, response);
  }
}
