import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserResponse, UsersResponse } from './types';
import { UpdateUserInput } from './dto';
import { GraphqlAuthGuard } from '../auth/guard/graphql-auth.guard';
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
  async searchUsers(
    @Args('searchTerm') searchTerm: string,
    @Context() context,
  ) {
    const userId = context.req.user.sub;
    const users = await this.userService.searchUsers(searchTerm, userId);
    return { users, success: true };
  }

  @Query(() => [User])
  async getUsersOfChatroom(@Args('chatroomId') chatroomId: number) {
    return this.userService.getUsersOfChatroom(chatroomId);
  }

  @Mutation(() => User)
  async updateUser(@Context() context, @Args('input') input: UpdateUserInput) {
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
