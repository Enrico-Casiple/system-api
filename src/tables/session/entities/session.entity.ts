import { ObjectType, Field } from '@nestjs/graphql';
import { Session as PrismaSession } from '@prisma/client';
import { UserAccount } from 'src/tables/user-account/entities/user-account.entity';

@ObjectType()
export class Session implements PrismaSession {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  access_token: string | null;
  @Field(() => String, { nullable: true })
  refresh_token: string | null;
  @Field(() => String, { nullable: true })
  reset_token: string | null;
  @Field(() => Boolean, { nullable: true })
  isLoggedOut: boolean;
  @Field(() => Date, { nullable: true })
  expires_in: Date;
  @Field(() => String, { nullable: true })
  user_account_id: string;
  @Field(() => UserAccount, { nullable: true })
  user_account: UserAccount;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
