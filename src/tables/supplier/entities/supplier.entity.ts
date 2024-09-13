import { ObjectType, Field } from '@nestjs/graphql';
import { Item } from 'src/tables/item/entities/item.entity';

@ObjectType()
export class Supplier {
@Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  address: string | null;
  @Field(() => String, { nullable: true })
  contact_person: string | null;
  @Field(() => String, { nullable: true })
  contact_number: string | null;
  @Field(() => String, { nullable: true })
  email: string | null;
  @Field(() => [Item], { nullable: true })
  items: Item[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
