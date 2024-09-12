import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class ItemCategory {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  user_approval_id: string | null;
  @Field(() => User, { nullable: true })
  user_approval: User;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
