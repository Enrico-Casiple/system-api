import { InputType, Field } from '@nestjs/graphql';
import { Company } from '@prisma/client';
import { CreateDepartmentInput } from 'src/tables/department/dto/create-department.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';

@InputType()
export class CreateCompanyInput implements Company {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  location: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  president: CreateUserInput;
  @Field(() => String, { nullable: true })
  president_id: string | null;
  @Field(() => [CreateDepartmentInput], { nullable: true })
  departments: CreateDepartmentInput[];
  @Field(() => [CreateUserInput], { nullable: true })
  user_company: CreateUserInput[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
