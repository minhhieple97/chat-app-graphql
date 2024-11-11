import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  fullname?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatarData?: string;
}

@InputType()
export class GetUsersInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  search?: string;

  @Field(() => Number, { defaultValue: 1 })
  page: number;

  @Field(() => Number, { defaultValue: 10 })
  limit: number;
}
