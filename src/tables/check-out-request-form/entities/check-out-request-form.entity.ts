import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CheckOutRequestForm as PrismaCheckOutRequestForm } from '@prisma/client';
import { RequestForm } from 'src/tables/request-form/entities/request-form.entity';

@ObjectType()
export class CheckOutRequestForm implements PrismaCheckOutRequestForm {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  requestion_forms_id: string | null;
  @Field(() => RequestForm, { nullable: true })
  requestion_forms: RequestForm;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
