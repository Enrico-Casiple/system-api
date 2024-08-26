import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createRole(
    @Args('currentUserId') currentUserId: string,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ) {
    const create_role = await this.roleService.create(
      createRoleInput,
      currentUserId,
    );
    pubSub.publish('roleCreated', { roleCreated: create_role });
    return create_role;
  }

  @Query(() => [Role], { name: 'roles' })
  async findAll() {
    return this.roleService.findAll();
  }

  @Query(() => Role, { name: 'role' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role)
  async updateRole(
    @Args('currentUserId') currentUserId: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    const update_user = await this.roleService.update(
      updateRoleInput.id,
      updateRoleInput,
      currentUserId,
    );
    pubSub.publish('roleCreated', { roleCreated: update_user });
    return update_user;
  }

  @Mutation(() => Role)
  async removeRole(
    @Args('currentUserId') currentUserId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    const delete_user = await this.roleService.remove(id, currentUserId);
    pubSub.publish('roleCreated', { roleCreated: delete_user });
    return delete_user;
  }

  @Subscription(() => Role)
  roleCreated() {
    return pubSub.asyncIterator('roleCreated');
  }
}
