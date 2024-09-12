import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApprovalService } from './approval.service';
import { Approval } from './entities/approval.entity';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';

@Resolver(() => Approval)
export class ApprovalResolver {
  constructor(private readonly approvalService: ApprovalService) {}

  @Mutation(() => Approval)
  createApproval(
    @Args('createApprovalInput') createApprovalInput: CreateApprovalInput,
  ) {
    return this.approvalService.create(createApprovalInput);
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
    return this.approvalService.update(
      updateApprovalInput.id,
      updateApprovalInput,
    );
  }

  @Mutation(() => Approval)
  removeApproval(@Args('id', { type: () => String }) id: string) {
    return this.approvalService.remove(id);
  }
}
