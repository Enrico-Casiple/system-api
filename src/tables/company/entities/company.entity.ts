import { ObjectType, Field } from '@nestjs/graphql';
import { Company_User, Company as PrismaCompany } from '@prisma/client';
import { Department } from 'src/tables/department/entities/department.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class Company implements PrismaCompany {
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
  @Field(() => User, { nullable: true })
  president: User;
  @Field(() => String, { nullable: true })
  president_id: string | null;
  @Field(() => [Department], { nullable: true })
  departments: Department[];
  @Field(() => [CompanyUser], { nullable: true })
  company_users: CompanyUser[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@ObjectType()
export class CompanyUser implements Company_User {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  company_id: string;
  @Field(() => Company, { nullable: true })
  company: Company;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => User, { nullable: true })
  user: User;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
