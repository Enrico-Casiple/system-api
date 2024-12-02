import { InputType, Int, Field } from '@nestjs/graphql';
import { $Enums, ApprovalUser, APPROVER_TYPE } from '@prisma/client';

@InputType()
export class CreateApprovalUserInput implements ApprovalUser {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Int, { nullable: true })
  level: number | null;
  @Field(() => String, { nullable: true })
  approver_type: APPROVER_TYPE;
  @Field(() => String, { nullable: true })
  approver_id: string | null;
  @Field(() => Boolean, { nullable: true })
  enable_condition: boolean;
  @Field(() => String, { nullable: true })
  item_category_id: string | null;
  @Field(() => String, { nullable: true })
  approval_id: string;
  @Field(() => String, { nullable: true })
  status: $Enums.APPROVAL_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
