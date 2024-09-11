import { ObjectType, Field } from '@nestjs/graphql';
import { ITEM_STATUS } from '@prisma/client';
import { RequestForm } from 'src/tables/request-form/entities/request-form.entity';

@ObjectType()
export class Item {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => Number, { nullable: true })
  quantity: number;
  @Field(() => Number, { nullable: true })
  price: number;
  @Field(() => Number, { nullable: true })
  total_price: number;
  @Field(() => String, { nullable: true })
  unit_of_measurement_id: string | null;
  // unit_of_measurement
  @Field(() => String, { nullable: true })
  item_category_id: string | null;
  // item_category
  @Field(() => String, { nullable: true })
  supplier_id: string | null;
  // supplier
  @Field(() => String, { nullable: true })
  requestion_forms_id: string | null;
  requestion_forms: RequestForm;
  @Field(() => String, { nullable: true })
  item_status: ITEM_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
