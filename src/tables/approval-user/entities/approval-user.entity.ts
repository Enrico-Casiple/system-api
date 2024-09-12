import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ApprovalUser {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
