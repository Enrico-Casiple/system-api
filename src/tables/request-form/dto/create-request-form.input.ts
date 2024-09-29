import { InputType, Field } from '@nestjs/graphql';
import { REQUESTION_STATUS, RequestionForm } from '@prisma/client';
import { CreateApprovalInput } from 'src/tables/approval/dto/create-approval.input';
import { CreateCheckOutRequestFormInput } from 'src/tables/check-out-request-form/dto/create-check-out-request-form.input';
import { CreateCompanyInput } from 'src/tables/company/dto/create-company.input';
import { CreateItemInput } from 'src/tables/item/dto/create-item.input';
import { CreateNoteInput } from 'src/tables/notes/dto/create-note.input';
import { CreateRequestionFormCategoryInput } from 'src/tables/requestion-form-category/dto/create-requestion-form-category.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';
import { User } from 'src/tables/user/entities/user.entity';

@InputType()
export class CreateRequestFormInput implements RequestionForm {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  requester: User;
  @Field(() => [CreateItemInput], { nullable: true })
  items: CreateItemInput[];
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  @Field(() => CreateApprovalInput, { nullable: true })
  approval: CreateApprovalInput;
  @Field(() => String, { nullable: true })
  status: REQUESTION_STATUS;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  @Field(() => CreateRequestionFormCategoryInput, { nullable: true })
  requestForm_category: CreateRequestionFormCategoryInput;
  @Field(() => String, { nullable: true })
  company_id: string;
  @Field(() => CreateCompanyInput, { nullable: true })
  company: CreateCompanyInput;
  @Field(() => [CreateNoteInput], { nullable: true })
  notes: CreateNoteInput[];
  @Field(() => CreateCheckOutRequestFormInput, { nullable: true })
  CheckOutRequestForm: CreateCheckOutRequestFormInput;
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
