import { InputType, Field } from '@nestjs/graphql';
import { Notes } from '@prisma/client';
import { CreateUserAccountInput } from 'src/tables/user-account/dto/create-user-account.input';

@InputType()
export class CreateNoteInput implements Notes {
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
  @Field(() => CreateUserAccountInput, { nullable: true })
  user_account: CreateUserAccountInput;
  @Field(() => Date, { nullable: true })
  requestion_forms_id: string;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
