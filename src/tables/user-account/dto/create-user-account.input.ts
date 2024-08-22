import { InputType, Field } from '@nestjs/graphql';
import { User_Account } from '@prisma/client';
import { CreateRoleInput } from 'src/tables/role/dto/create-role.input';
import { CreateSessionInput } from 'src/tables/session/dto/create-session.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';

@InputType()
export class CreateUserAccountInput implements User_Account {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
  @Field(() => String, {
    nullable: true,
  })
  email: string | null;
  @Field(() => String, {
    nullable: true,
  })
  username: string | null;
  @Field(() => String, {
    nullable: true,
  })
  password: string | null;
  @Field(() => String, {
    nullable: true,
  })
  user_id: string | null;
  @Field(() => CreateUserInput, {
    nullable: true,
  })
  user: CreateUserInput;
  @Field(() => CreateRoleInput, {
    nullable: true,
  })
  role: CreateRoleInput;
  @Field(() => [String], {
    nullable: true,
  })
  role_id: string[] | null;
  @Field(() => CreateSessionInput, {
    nullable: true,
  })
  session: CreateSessionInput;
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
