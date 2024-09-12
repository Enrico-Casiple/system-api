import { CreateRequestFormInput } from './create-request-form.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestFormInput extends PartialType(
  CreateRequestFormInput,
) {
  @Field(() => String, { nullable: true })
  id: string;
}
