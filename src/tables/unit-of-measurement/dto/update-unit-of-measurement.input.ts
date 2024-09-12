import { CreateUnitOfMeasurementInput } from './create-unit-of-measurement.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUnitOfMeasurementInput extends PartialType(CreateUnitOfMeasurementInput) {
  @Field(() => Int)
  id: number;
}
