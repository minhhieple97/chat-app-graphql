import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserResponse, UsersResponse } from './types';
import { UpdateUserInput } from './dto';
import { GraphqlAuthGuard } from '../auth/guard/graphql-auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
@Resolver(() => User)
@UseGuards(GraphqlAuthGuard)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserResponse)
  async getUser(@Context() context) {
    const userId = context.req.user.sub;
    return this.userService.getUser(userId);
  }

  @Query(() => UsersResponse)
  async searchUsers(@Args('fullname') fullname: string, @Context() context) {
    const userId = context.req.user.sub;
    return this.userService.searchUsers(fullname, userId);
  }

  @Query(() => [User])
  async getUsersOfChatroom(@Args('chatroomId') chatroomId: number) {
    return this.userService.getUsersOfChatroom(chatroomId);
  }

  @Mutation(() => User)
  async updateUser(
    @Context() context,
    @Args('input') input: UpdateUserInput,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file: GraphQLUpload.FileUpload,
  ) {
    console.log(file);
    const userId = context.req.user.sub;
    return this.userService.update(userId, input);
  }

  @Mutation(() => User)
  async updateAvatar(
    @Context() context,
    @Args('base64Image') base64Image: string,
  ) {
    const userId = context.req.user.sub;
    return this.userService.updateAvatar(userId, base64Image);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Context() context) {
    const userId = context.req.user.sub;
    await this.userService.delete(userId);
    return true;
  }
}
