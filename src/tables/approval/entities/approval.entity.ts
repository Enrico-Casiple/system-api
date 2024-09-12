import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Approval as PrismaApproval } from '@prisma/client';
import { RequestForm } from 'src/tables/request-form/entities/request-form.entity';

@ObjectType()
export class Approval implements PrismaApproval {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  user_approval_id: string | null;
  // user_approval: User;
  @Field(() => [RequestForm], { nullable: true })
  requestion_forms: RequestForm[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
