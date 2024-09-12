import { CreateApprovalUserInput } from './create-approval-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateApprovalUserInput extends PartialType(
  CreateApprovalUserInput,
) {
  @Field(() => String, { nullable: true })
  id: string;
}
