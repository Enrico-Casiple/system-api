import { ObjectType, Field } from '@nestjs/graphql';
import { User_Account } from '@prisma/client';
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
  session: Session;
  @Field(() => Date, {
    nullable: true,
  })
  created_at: Date;
  @Field(() => Date, {
    nullable: true,
  })
  updated_at: Date;
}
