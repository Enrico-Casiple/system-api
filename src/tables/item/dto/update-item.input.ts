import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String, { nullable: true })
  id: string;
}
