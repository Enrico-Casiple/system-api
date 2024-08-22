import { InputType, Field } from '@nestjs/graphql';
import { Department } from '@prisma/client';

@InputType()
export class CreateDepartmentInput implements Department {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  company_id: string | null;

  @Field(() => String, { nullable: true })
  manager_id: string | null;

  @Field(() => Date, { nullable: true })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
