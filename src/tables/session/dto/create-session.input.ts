import { InputType, Field } from '@nestjs/graphql';
import { Session } from '@prisma/client';
import { CreateUserAccountInput } from 'src/tables/user-account/dto/create-user-account.input';

@InputType()
export class CreateSessionInput implements Session {
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
  @Field(() => CreateUserAccountInput, { nullable: true })
  user_account: CreateUserAccountInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
