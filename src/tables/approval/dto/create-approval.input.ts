import { InputType, Int, Field } from '@nestjs/graphql';
import { Approval } from '@prisma/client';

@InputType()
export class CreateApprovalInput implements Approval {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  user_approval_id: string | null;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
