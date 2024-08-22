import { ObjectType, Field } from '@nestjs/graphql';
import { Department as PrismaDepartment } from '@prisma/client';
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

  @Field(() => [User], { nullable: true })
  users_department: User[];

  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
