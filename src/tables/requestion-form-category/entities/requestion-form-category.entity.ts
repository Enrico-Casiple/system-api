import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RequestForm } from 'src/tables/request-form/entities/request-form.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class RequestionFormCategory {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => String, { nullable: true })
  short_name: string | null;
  @Field(() => [RequestForm], { nullable: true })
  requestion_forms: RequestForm[];
  @Field(() => String, { nullable: true })
  user_verifier_id: string | null;
  @Field(() => User, { nullable: true })
  user_verifier: User;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
