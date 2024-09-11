import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ApprovalUserService } from './approval-user.service';
import { ApprovalUser } from './entities/approval-user.entity';
import { CreateApprovalUserInput } from './dto/create-approval-user.input';
import { UpdateApprovalUserInput } from './dto/update-approval-user.input';

@Resolver(() => ApprovalUser)
export class ApprovalUserResolver {
  constructor(private readonly approvalUserService: ApprovalUserService) {}

  @Mutation(() => ApprovalUser)
  createApprovalUser(@Args('createApprovalUserInput') createApprovalUserInput: CreateApprovalUserInput) {
    return this.approvalUserService.create(createApprovalUserInput);
  }

  @Query(() => [ApprovalUser], { name: 'approvalUser' })
  findAll() {
    return this.approvalUserService.findAll();
  }

  @Query(() => ApprovalUser, { name: 'approvalUser' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.approvalUserService.findOne(id);
  }

  @Mutation(() => ApprovalUser)
  updateApprovalUser(@Args('updateApprovalUserInput') updateApprovalUserInput: UpdateApprovalUserInput) {
    return this.approvalUserService.update(updateApprovalUserInput.id, updateApprovalUserInput);
  }

  @Mutation(() => ApprovalUser)
  removeApprovalUser(@Args('id', { type: () => Int }) id: number) {
    return this.approvalUserService.remove(id);
  }
}
