import { CreateRequestionFormCategoryInput } from './create-requestion-form-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestionFormCategoryInput extends PartialType(
  CreateRequestionFormCategoryInput,
) {
  @Field(() => String, { nullable: true })
  id: string;
}
