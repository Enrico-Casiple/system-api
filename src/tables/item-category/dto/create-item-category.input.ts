import { InputType, Field } from '@nestjs/graphql';
import { ItemCategory } from '@prisma/client';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';



@InputType()
export class CreateItemCategoryInput  implements ItemCategory {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field(() => String, { nullable: true })
  user_approval_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  user_approval: CreateUserInput;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
