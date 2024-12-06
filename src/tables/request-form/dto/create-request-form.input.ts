import { Field, InputType } from '@nestjs/graphql';
import {
  APPROVAL_STATUS,
  ApprovalProcess,
  APPROVER_TYPE,
  ITEM_STATUS,
  Request_item,
  RequestionForm,
} from '@prisma/client';
import { CreateApprovalInput } from 'src/tables/approval/dto/create-approval.input';
import { CreateCheckOutRequestFormInput } from 'src/tables/check-out-request-form/dto/create-check-out-request-form.input';
import { CreateCompanyInput } from 'src/tables/company/dto/create-company.input';
import { CreateDepartmentInput } from 'src/tables/department/dto/create-department.input';
import { CreateItemCategoryInput } from 'src/tables/item-category/dto/create-item-category.input';
import { CreateNoteInput } from 'src/tables/notes/dto/create-note.input';
import { CreateRequestionFormCategoryInput } from 'src/tables/requestion-form-category/dto/create-requestion-form-category.input';
import { CreateUserInput } from 'src/tables/user/dto/create-user.input';
import { User } from 'src/tables/user/entities/user.entity';

@InputType()
export class CreateRequestItem implements Request_item {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  description: string;
  @Field(() => Number, { nullable: true })
  quantity: number;
  @Field(() => String, { nullable: true })
  unit_of_measurement: string | null;
  @Field(() => String, { nullable: true })
  item_category: string | null;
  @Field(() => String, { nullable: true })
  requestion_forms_id: string | null;
  @Field(() => String, { nullable: true })
  item_status: ITEM_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@InputType()
export class CreateRequestFormInput implements RequestionForm {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Number, { nullable: true })
  purchase_number: number | null;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => CreateUserInput, { nullable: true })
  requester: User;
  @Field(() => [CreateRequestItem], { nullable: true })
  items: CreateRequestItem[];
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  @Field(() => CreateApprovalInput, { nullable: true })
  approval: CreateApprovalInput;
  @Field(() => String, { nullable: true })
  status: string | null;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  @Field(() => CreateRequestionFormCategoryInput, { nullable: true })
  requestForm_category: CreateRequestionFormCategoryInput;
  @Field(() => String, { nullable: true })
  company_id: string;
  @Field(() => CreateCompanyInput, { nullable: true })
  company: CreateCompanyInput;
  @Field(() => String, { nullable: true })
  department_id: string;
  @Field(() => CreateDepartmentInput, { nullable: true })
  department: CreateDepartmentInput;
  @Field(() => [CreateNoteInput], { nullable: true })
  notes: CreateNoteInput[];
  @Field(() => CreateCheckOutRequestFormInput, { nullable: true })
  CheckOutRequestForm: CreateCheckOutRequestFormInput;
  // @Field(() => [CreateApprovalProcessInput], { nullable: true })
  // approval_process: CreateApprovalProcessInput[];
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@InputType()
export class CreateApprovalProcessInput implements ApprovalProcess {
  @Field(() => String, { nullable: true })
  id: string;
  requestFormId: string;
  @Field(() => CreateRequestFormInput, { nullable: true })
  requestForm: CreateRequestFormInput;
  @Field(() => String, { nullable: true })
  level: number;
  @Field(() => String, { nullable: true })
  approver_type: APPROVER_TYPE;
  @Field(() => String, { nullable: true })
  approver_id: string | null;
  @Field(() => User, { nullable: true })
  approver: User;
  @Field(() => Boolean, { nullable: true })
  enable_condition: boolean;
  @Field(() => String, { nullable: true })
  categoty_name_id: string | null;
  @Field(() => CreateItemCategoryInput, { nullable: true })
  category_name: CreateItemCategoryInput;
  @Field(() => String, { nullable: true })
  status: APPROVAL_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
