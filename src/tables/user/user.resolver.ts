import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput);
    pubSub.publish('userCreated', { userCreated: user });
    return user;
  }

  @Query(() => [User])
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const update_user = await this.userService.update(
      updateUserInput.id,
      updateUserInput,
    );
    pubSub.publish('userCreated', { userCreated: update_user });
    return update_user;
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    const delete_user = await this.userService.remove(id);
    pubSub.publish('userCreated', { userCreated: delete_user });
    return delete_user;
  }

  @Subscription(() => User)
  async userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
