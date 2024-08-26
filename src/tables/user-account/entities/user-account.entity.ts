import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User_Account } from '@prisma/client';
import { Note } from 'src/tables/notes/entities/note.entity';
import { Role } from 'src/tables/role/entities/role.entity';
import { Session } from 'src/tables/session/entities/session.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class UserAccount implements User_Account {
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
  @Field(() => User, {
    nullable: true,
  })
  user: User;
  @Field(() => String, {
    nullable: true,
  })
  user_id: string | null;
  @Field(() => [Role], {
    nullable: true,
  })
  role: Role[];
  @Field(() => [String], {
    nullable: true,
  })
  role_id: string[] | null;
  @Field(() => Session, {
    nullable: true,
  })
  sessions: Session;
  @Field(() => [Note], {
    nullable: true,
  })
  notes: Note[];
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
  @Field(() => String, { nullable: true })
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
