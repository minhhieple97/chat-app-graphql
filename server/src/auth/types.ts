import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/types';

@ObjectType()
export class AuthResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class LoginResponse extends AuthResponse {}

@ObjectType()
export class RegisterResponse extends AuthResponse {}

@ObjectType()
export class LogoutResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}
