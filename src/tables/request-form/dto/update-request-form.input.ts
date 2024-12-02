import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRequestFormInput } from './create-request-form.input';

@InputType()
export class UpdateRequestFormInput extends PartialType(
  CreateRequestFormInput,
) {
  @Field(() => String, { nullable: true })
  id: string;
}
