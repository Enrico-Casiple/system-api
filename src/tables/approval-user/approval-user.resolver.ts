import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { ApprovalUserService } from './approval-user.service';
import { ApprovalUser } from './entities/approval-user.entity';
import { CreateApprovalUserInput } from './dto/create-approval-user.input';
import { UpdateApprovalUserInput } from './dto/update-approval-user.input';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
@Resolver(() => ApprovalUser)
export class ApprovalUserResolver {
  constructor(private readonly approvalUserService: ApprovalUserService) {}

  @Mutation(() => ApprovalUser)
  createApprovalUser(
    @Args('createApprovalUserInput')
    createApprovalUserInput: CreateApprovalUserInput,
  ) {
    const create = this.approvalUserService.create(createApprovalUserInput);
    pubsub.publish('approvalUserCreated', { approvalUserCreated: create });
    return create;
  }

  @Query(() => [ApprovalUser], { name: 'approvalUser' })
  findAll() {
    return this.approvalUserService.findAll();
  }

  @Query(() => ApprovalUser, { name: 'approvalUser' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.approvalUserService.findOne(id);
  }

  @Mutation(() => ApprovalUser)
  updateApprovalUser(
    @Args('updateApprovalUserInput')
    updateApprovalUserInput: UpdateApprovalUserInput,
  ) {
    const update = this.approvalUserService.update(
      updateApprovalUserInput.id,
      updateApprovalUserInput,
    );
    pubsub.publish('approvalUserCreated', { approvalUserCreated: update });
    return update;
  }

  @Mutation(() => ApprovalUser)
  removeApprovalUser(@Args('id', { type: () => String }) id: string) {
    const remove = this.approvalUserService.remove(id);
    pubsub.publish('approvalUserCreated', { approvalUserCreated: remove });
    return remove;
  }

  @Subscription(() => ApprovalUser)
  approvalUserCreated() {
    return pubsub.asyncIterator('approvalUserCreated');
  }
}
