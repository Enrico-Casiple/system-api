import { InputType, Field } from '@nestjs/graphql';
import { RequestionFormCategory } from '@prisma/client';
import { CreateRequestFormInput } from 'src/tables/request-form/dto/create-request-form.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';

@InputType()
export class CreateRequestionFormCategoryInput
  implements RequestionFormCategory
{
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  short_name: string | null;
  @Field(() => [CreateRequestFormInput], { nullable: true })
  requestion_forms: CreateRequestFormInput[];
  @Field(() => String, { nullable: true })
  user_verifier_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  user_verifier: CreateUserInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
