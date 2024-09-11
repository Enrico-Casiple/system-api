import { CreateApprovalUserInput } from './create-approval-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApprovalUserInput extends PartialType(CreateApprovalUserInput) {
  @Field(() => Int)
  id: number;
}
