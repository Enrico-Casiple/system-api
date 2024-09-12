import { InputType, Int, Field } from '@nestjs/graphql';
import { UnitOfMeasurement } from '@prisma/client';

@InputType()
export class CreateUnitOfMeasurementInput implements UnitOfMeasurement {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  symbol: string | null;
  @Field(() => String, { nullable: true })
  base_unit: string | null;
  @Field(() => Int, { nullable: true })
  conversion_factor: number | null;
  @Field(() => String, { nullable: true })
  resutl_unit: string | null;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
