import { CreateApprovalInput } from './create-approval.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
@InputType()
export class UpdateApprovalInput extends PartialType(CreateApprovalInput) {
  @Field(() => String, { nullable: true })
  id: string;
}
