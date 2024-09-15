import { InputType, Int, Field } from '@nestjs/graphql';
import { Approval } from '@prisma/client';
import { CreateApprovalUserInput } from 'src/tables/approval-user/dto/create-approval-user.input';

@InputType()
export class CreateApprovalInput implements Approval {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => [String], { nullable: true })
  user_approval_id: string[] | null;
  @Field(() => [CreateApprovalUserInput], { nullable: true })
  user_approval: CreateApprovalUserInput[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
