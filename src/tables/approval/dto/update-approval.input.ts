import { CreateApprovalInput } from './create-approval.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApprovalInput extends PartialType(CreateApprovalInput) {
  @Field(() => Int)
  id: number;
}
