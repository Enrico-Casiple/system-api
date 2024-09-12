import { CreateItemCategoryInput } from './create-item-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemCategoryInput extends PartialType(CreateItemCategoryInput) {
  @Field(() => String, { nullable: true })
  id: string;
}
