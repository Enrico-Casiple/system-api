import { Field, ObjectType } from '@nestjs/graphql';
import { ITEM_STATUS } from '@prisma/client';
import { ItemCategory } from 'src/tables/item-category/entities/item-category.entity';
import { RequestForm } from 'src/tables/request-form/entities/request-form.entity';
import { UnitOfMeasurement } from 'src/tables/unit-of-measurement/entities/unit-of-measurement.entity';

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
  @Field(() => UnitOfMeasurement, { nullable: true })
  unit_of_measurement: UnitOfMeasurement;
  @Field(() => String, { nullable: true })
  item_category_id: string | null;
  @Field(() => ItemCategory, { nullable: true })
  item_category: ItemCategory;
  @Field(() => String, { nullable: true })
  supplier_id: string | null;
  @Field(() => String, { nullable: true })
  requestion_forms_id: string | null;
  @Field(() => RequestForm, { nullable: true })
  requestion_forms: RequestForm;
  @Field(() => String, { nullable: true })
  item_status: ITEM_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
