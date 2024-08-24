import { InputType, Field, Int } from '@nestjs/graphql';
import { User_Account } from '@prisma/client';
import { CreateNoteInput } from 'src/tables/notes/dto/create-note.input';
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
  @Field(() => [CreateNoteInput], {
    nullable: true,
  })
  notes: CreateNoteInput[];
  @Field(() => String, {
    nullable: true,
  })
  type: string;
  @Field(() => String, {
    nullable: true,
  })
  provider: string;
  @Field(() => String, {
    nullable: true,
  })
  providerAccountId: string;
  @Field(() => String, {
    nullable: true,
  })
  refresh_token: string;
  @Field(() => String, {
    nullable: true,
  })
  access_token: string;
  @Field(() => Int, {
    nullable: true,
  })
  expires_at: number;
  @Field(() => String, {
    nullable: true,
  })
  token_type: string;
  @Field(() => String, {
    nullable: true,
  })
  scope: string;
  @Field(() => String, {
    nullable: true,
  })
  id_token: string;
  @Field(() => String, {
    nullable: true,
  })
  session_state: string;
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
