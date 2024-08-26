import { Field, ObjectType } from '@nestjs/graphql';
import { POSITION, User as UserPrisma } from '@prisma/client';
import {
  Company,
  CompanyUser,
} from 'src/tables/company/entities/company.entity';
import {
  Department,
  DepartmentUser,
} from 'src/tables/department/entities/department.entity';
import { UserAccount } from 'src/tables/user-account/entities/user-account.entity';

@ObjectType()
export class User implements UserPrisma {
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
  phone_number: string;
  @Field(() => Date, {
    nullable: true,
  })
  emailVerified: Date;
  @Field(() => String, {
    nullable: true,
  })
  image: string;
  @Field(() => [CompanyUser], {
    nullable: true,
  })
  companies: CompanyUser[];
  @Field(() => [DepartmentUser], {
    nullable: true,
  })
  departments: DepartmentUser[];
  @Field(() => [Company], {
    nullable: true,
  })
  company_president: Company[];
  @Field(() => UserAccount, {
    nullable: true,
  })
  user_account: UserAccount;
  @Field(() => [Department], {
    nullable: true,
  })
  department_manager: Department[];
  @Field(() => [Department], {
    nullable: true,
  })
  department_supervisor: Department[];
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
