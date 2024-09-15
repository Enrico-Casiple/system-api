import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { ApprovalService } from './approval.service';
import { Approval } from './entities/approval.entity';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Approval)
export class ApprovalResolver {
  constructor(private readonly approvalService: ApprovalService) {}

  @Mutation(() => Approval)
  createApproval(
    @Args('createApprovalInput') createApprovalInput: CreateApprovalInput,
  ) {
    const create = this.approvalService.create(createApprovalInput);
    pubSub.publish('approvalCreated', { approvalCreated: create });
    return create;
  }

  @Query(() => [Approval], { name: 'approvals' })
  findAll() {
    return this.approvalService.findAll();
  }

  @Query(() => Approval, { name: 'approval' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.approvalService.findOne(id);
  }

  @Mutation(() => Approval)
  updateApproval(
    @Args('updateApprovalInput') updateApprovalInput: UpdateApprovalInput,
  ) {
    const update = this.approvalService.update(
      updateApprovalInput.id,
      updateApprovalInput,
    );
    pubSub.publish('approvalCreated', { approvalCreated: update });
    return update;
  }

  @Mutation(() => Approval)
  removeApproval(@Args('id', { type: () => String }) id: string) {
    const remove = this.approvalService.remove(id);
    pubSub.publish('approvalCreated', { approvalCreated: remove });
    return remove;
  }

  @Subscription(() => Approval)
  approvalCreated() {
    return pubSub.asyncIterator('approvalCreated');
  }
}
