import { ObjectType, Field } from '@nestjs/graphql';
import {
  Role as PrismaRole,
  Permission as PrismaPermission,
  VIEW_SCOPE,
  MODULE,
} from '@prisma/client';
import { UserAccount } from 'src/tables/user-account/entities/user-account.entity';

@ObjectType()
export class Role implements PrismaRole {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
  @Field(() => String, {
    nullable: true,
  })
  name: string | null;

  @Field(() => [Permission], {
    nullable: true,
  })
  permissions: Permission[];

  @Field(() => [String], {
    nullable: true,
  })
  user_account_id: string[] | null;

  @Field(() => [UserAccount], {
    nullable: true,
  })
  user_account: UserAccount[];

  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}

@ObjectType()
export class Permission implements PrismaPermission {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
  @Field(() => String, {
    nullable: true,
  })
  module: MODULE;
  @Field(() => Boolean, {
    nullable: true,
  })
  view: boolean;
  @Field(() => Boolean, {
    nullable: true,
  })
  add: boolean;
  @Field(() => Boolean, {
    nullable: true,
  })
  edit: boolean;
  @Field(() => Boolean, {
    nullable: true,
  })
  delete: boolean;
  @Field(() => Boolean, {
    nullable: true,
  })
  role_id: string;
  @Field(() => Role, {
    nullable: true,
  })
  role: Role;
  @Field(() => String, {
    nullable: true,
  })
  scope: VIEW_SCOPE;
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
