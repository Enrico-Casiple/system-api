import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => Department)
  createDepartment(
    @Args('currentUserId') currentUserId: string,
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    const department = this.departmentService.create(
      createDepartmentInput,
      currentUserId,
    );
    pubSub.publish('departmentAdded', { departmentAdded: department });
    return department;
  }

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.departmentService.findOne(id);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args('currentUserId') currentUserId: string,
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    const department = this.departmentService.update(
      updateDepartmentInput.id,
      updateDepartmentInput,
      currentUserId,
    );
    pubSub.publish('departmentAdded', { departmentAdded: department });
    return department;
  }

  @Mutation(() => Department)
  removeDepartment(
    @Args('currentUserId') currentUserId: string,
    @Args('id', { type: () => String }) id: string,
  ) {
    const department = this.departmentService.remove(id, currentUserId);
    pubSub.publish('departmentAdded', { departmentAdded: department });
    return department;
  }

  @Subscription(() => Department)
  departmentAdded() {
    return pubSub.asyncIterator('departmentAdded');
  }
}
