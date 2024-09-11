import { CreateCheckOutRequestFormInput } from './create-check-out-request-form.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCheckOutRequestFormInput extends PartialType(CreateCheckOutRequestFormInput) {
  @Field(() => Int)
  id: number;
}
