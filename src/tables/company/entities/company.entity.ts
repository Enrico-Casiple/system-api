import { ObjectType, Field } from '@nestjs/graphql';
import { Company as PrismaCompany } from '@prisma/client';
import { Department } from 'src/tables/department/entities/department.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class Company implements PrismaCompany {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
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
  @Field(() => [User], { nullable: true })
  user_company: User[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
