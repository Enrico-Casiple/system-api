import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateApprovalUserInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
