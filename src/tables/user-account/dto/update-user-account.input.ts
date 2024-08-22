import { CreateUserAccountInput } from './create-user-account.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserAccountInput extends PartialType(
  CreateUserAccountInput,
) {
  @Field(() => String, {
    nullable: true,
  })
  id: string;
}
