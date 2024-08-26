import { InputType, Field } from '@nestjs/graphql';
import { MODULE, Permission, Role, VIEW_SCOPE } from '@prisma/client';
import { CreateUserAccountInput } from 'src/tables/user-account/dto/create-user-account.input';

@InputType()
export class CreateRoleInput implements Role {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
  @Field(() => String, {
    nullable: true,
  })
  name: string | null;

  @Field(() => [CreatePermissionInput], {
    nullable: true,
  })
  permissions: CreatePermissionInput[];

  @Field(() => [String], {
    nullable: true,
  })
  user_account_id: string[] | null;

  @Field(() => [CreateUserAccountInput], {
    nullable: true,
  })
  user_account: CreateUserAccountInput[];

  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}

@InputType()
export class CreatePermissionInput implements Permission {
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
  verify: boolean;
  @Field(() => String, {
    nullable: true,
  })
  role_id: string;
  @Field(() => CreateRoleInput, {
    nullable: true,
  })
  role: CreateRoleInput;
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
