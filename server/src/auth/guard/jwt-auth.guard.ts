import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/token/token.service';
import { Request } from 'express';
import { UserTokenPayload } from 'src/user/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.tokenService.validateAccessToken(token);
      if (!payload) {
        throw new UnauthorizedException();
      }
      request['user'] = payload as UserTokenPayload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }
}
