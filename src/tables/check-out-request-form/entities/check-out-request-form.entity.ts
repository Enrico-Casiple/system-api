import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CheckOutRequestForm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
