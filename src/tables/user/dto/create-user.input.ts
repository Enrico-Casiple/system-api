import { Field, InputType } from '@nestjs/graphql';
import { POSITION, User } from '@prisma/client';
import { CreateCompanyInput } from 'src/tables/company/dto/create-company.input';
import { CreateDepartmentInput } from 'src/tables/department/dto/create-department.input';
import { CreateUserAccountInput } from 'src/tables/user-account/dto/create-user-account.input';

@InputType()
export class CreateUserInput implements User {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
  @Field(() => String, {
    nullable: true,
  })
  first_name: string | null;
  @Field(() => String, {
    nullable: true,
  })
  middle_name: string | null;
  @Field(() => String, {
    nullable: true,
  })
  last_name: string | null;
  @Field(() => String, {
    nullable: true,
  })
  email: string | null;
  @Field(() => String, {
    nullable: true,
  })
  position: POSITION | null;
  @Field(() => String, {
    nullable: true,
  })
  company_id: string | null;
  @Field(() => CreateCompanyInput, {
    nullable: true,
  })
  company: CreateCompanyInput;
  @Field(() => String, {
    nullable: true,
  })
  department_id: string | null;
  @Field(() => CreateDepartmentInput, {
    nullable: true,
  })
  department: CreateDepartmentInput;
  @Field(() => CreateCompanyInput, {
    nullable: true,
  })
  company_president: CreateCompanyInput;
  @Field(() => CreateUserAccountInput, {
    nullable: true,
  })
  user_account: CreateUserAccountInput;
  @Field(() => [CreateDepartmentInput], {
    nullable: true,
  })
  department_manager: CreateDepartmentInput[];
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
