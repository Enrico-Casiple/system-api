import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UnitOfMeasurement {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
