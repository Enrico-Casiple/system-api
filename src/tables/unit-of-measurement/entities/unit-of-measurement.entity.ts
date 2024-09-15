import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Item } from 'src/tables/item/entities/item.entity';

@ObjectType()
export class UnitOfMeasurement {
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
  result_unit: string | null;
  @Field(() => [Item], { nullable: true })
  items: Item[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
