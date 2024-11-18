import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field({ nullable: true })
  id?: number;

  @Field()
  email: string;

  @Field()
  fullname: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  avatarUrl?: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User)
  user: User;

  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

@ObjectType()
export class UsersResponse {
  @Field(() => [User])
  users: User[];

  @Field(() => Boolean)
  success: boolean;
}

export type UserTokenPayload = {
  username: string;
  sub: number;
  exp: number;
  iat: number;
};
