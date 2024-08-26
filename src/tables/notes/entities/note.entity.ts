import { ObjectType, Field } from '@nestjs/graphql';
import { UserAccount } from 'src/tables/user-account/entities/user-account.entity';

@ObjectType()
export class Note {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  logs: string | null;
  @Field(() => String, { nullable: true })
  user_account_id: string | null;
  @Field(() => UserAccount, { nullable: true })
  user_account: UserAccount;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
