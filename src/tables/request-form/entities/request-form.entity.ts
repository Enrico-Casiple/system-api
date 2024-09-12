import { ObjectType, Field } from '@nestjs/graphql';
import { REQUESTION_STATUS } from '@prisma/client';
import { Note } from 'src/tables/notes/entities/note.entity';
import { User } from 'src/tables/user/entities/user.entity';
import { RequestionForm as PrismaRequestionForm } from '@prisma/client';
import { Item } from 'src/tables/item/entities/item.entity';
import { Approval } from 'src/tables/approval/entities/approval.entity';
import { RequestionFormCategory } from 'src/tables/requestion-form-category/entities/requestion-form-category.entity';
import { CheckOutRequestForm } from 'src/tables/check-out-request-form/entities/check-out-request-form.entity';

@ObjectType()
export class RequestForm implements PrismaRequestionForm {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => User, { nullable: true })
  requester: User;
  @Field(() => [Item], { nullable: true })
  items: Item[];
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  @Field(() => Approval, { nullable: true })
  approval: Approval;
  @Field(() => String, { nullable: true })
  status: REQUESTION_STATUS;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  @Field(() => RequestionFormCategory, { nullable: true })
  requestForm_category: RequestionFormCategory;
  @Field(() => [Note], { nullable: true })
  notes: Note[];
  @Field(() => CheckOutRequestForm, { nullable: true })
  CheckOutRequestForm: CheckOutRequestForm;
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
