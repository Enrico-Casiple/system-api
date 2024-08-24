import { InputType, Field } from '@nestjs/graphql';
import { Company, Company_User } from '@prisma/client';
import { CreateDepartmentInput } from 'src/tables/department/dto/create-department.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';

@InputType()
export class CreateCompanyInput implements Company {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  short_name: string | null;
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
  @Field(() => [CreateCompanyUserInput], { nullable: true })
  company_users: CreateCompanyUserInput[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@InputType()
export class CreateCompanyUserInput implements Company_User {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  company_id: string;
  @Field(() => CreateCompanyInput, { nullable: true })
  company: CreateCompanyInput;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  user: CreateUserInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
