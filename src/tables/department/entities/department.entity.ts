import { ObjectType, Field } from '@nestjs/graphql';
import {
  Department_User,
  Department as PrismaDepartment,
} from '@prisma/client';
import { Company } from 'src/tables/company/entities/company.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class Department implements PrismaDepartment {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => Company, { nullable: true })
  company: Company;
  @Field(() => String, { nullable: true })
  company_id: string | null;
  @Field(() => User, { nullable: true })
  manager: User;
  @Field(() => String, { nullable: true })
  manager_id: string | null;
  @Field(() => [DepartmentUser], { nullable: true })
  department_users: DepartmentUser[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@ObjectType()
export class DepartmentUser implements Department_User {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  department_id: string;
  @Field(() => Department, { nullable: true })
  department: Department;
  @Field(() => String, { nullable: true })
  user_id: string;
  @Field(() => User, { nullable: true })
  user: User;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
