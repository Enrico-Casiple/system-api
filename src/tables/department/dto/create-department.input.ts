import { InputType, Field } from '@nestjs/graphql';
import { Department, Department_User } from '@prisma/client';
import { CreateCompanyInput } from 'src/tables/company/dto/create-company.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';

@InputType()
export class CreateDepartmentInput implements Department {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => CreateCompanyInput, { nullable: true })
  company: CreateCompanyInput;
  @Field(() => String, { nullable: true })
  company_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  manager: CreateUserInput;
  @Field(() => String, { nullable: true })
  manager_id: string | null;
  @Field(() => [CreateDepartmentUserInput], { nullable: true })
  department_users: CreateDepartmentUserInput[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@InputType()
export class CreateDepartmentUserInput implements Department_User {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  department_id: string;
  @Field(() => CreateDepartmentInput, { nullable: true })
  department: CreateDepartmentInput;
  @Field(() => String, { nullable: true })
  user_id: string;
  @Field(() => CreateUserInput, { nullable: true })
  user: CreateUserInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
