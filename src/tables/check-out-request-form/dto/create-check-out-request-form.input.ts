import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateRequestFormInput } from 'src/tables/request-form/dto/create-request-form.input';

@InputType()
export class CreateCheckOutRequestFormInput {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  requestion_forms_id: string | null;
  @Field(() => CreateRequestFormInput, { nullable: true })
  requestion_forms: CreateRequestFormInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
