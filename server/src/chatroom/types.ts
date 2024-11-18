import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from 'src/user/types';

@ObjectType()
export class Chatroom {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}

@ObjectType()
export class Message {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  imageUrl?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => Chatroom, { nullable: true }) // array of user IDs
  chatroom?: Chatroom;

  @Field(() => User, { nullable: true }) // array of user IDs
  user?: User;
}

@ObjectType()
export class UserTyping {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field({ nullable: true })
  chatroomId?: number;
}

@ObjectType()
export class UserStoppedTyping extends UserTyping {}
