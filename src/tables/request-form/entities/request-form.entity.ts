import { Field, ObjectType } from '@nestjs/graphql';
import {
  APPROVAL_STATUS,
  APPROVER_TYPE,
  ITEM_STATUS,
  ApprovalProcess as PrismaApprovalProcess,
  RequestionForm as PrismaRequestionForm,
  Request_item,
} from '@prisma/client';
import { Approval } from 'src/tables/approval/entities/approval.entity';
import { CheckOutRequestForm } from 'src/tables/check-out-request-form/entities/check-out-request-form.entity';
import { Company } from 'src/tables/company/entities/company.entity';
import { Department } from 'src/tables/department/entities/department.entity';
import { ItemCategory } from 'src/tables/item-category/entities/item-category.entity';
import { Note } from 'src/tables/notes/entities/note.entity';
import { RequestionFormCategory } from 'src/tables/requestion-form-category/entities/requestion-form-category.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class RequestForm implements PrismaRequestionForm {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Number, { nullable: true })
  purchase_number: number;
  @Field(() => String, { nullable: true })
  user_id: string | null;
  @Field(() => User, { nullable: true })
  requester: User;
  @Field(() => [RequestItem], { nullable: true })
  items: RequestItem[];
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  @Field(() => Approval, { nullable: true })
  approval: Approval;
  @Field(() => String, { nullable: true })
  status: string | null;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  @Field(() => RequestionFormCategory, { nullable: true })
  requestForm_category: RequestionFormCategory;
  @Field(() => String, { nullable: true })
  company_id: string | null;
  @Field(() => Company, { nullable: true })
  company: Company;
  @Field(() => String, { nullable: true })
  department_id: string | null;
  @Field(() => Department, { nullable: true })
  department: Department;
  @Field(() => [Note], { nullable: true })
  notes: Note[];
  @Field(() => CheckOutRequestForm, { nullable: true })
  CheckOutRequestForm: CheckOutRequestForm;
  @Field(() => [ApprovalProcess], { nullable: true })
  approval_process: ApprovalProcess[];
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
@ObjectType()
export class RequestItem implements Request_item {
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
  @Field(() => RequestForm, { nullable: true })
  requestion_forms: RequestForm;
  @Field(() => String, { nullable: true })
  item_status: ITEM_STATUS;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}

@ObjectType()
export class ApprovalProcess implements PrismaApprovalProcess {
  @Field(() => String, { nullable: true })
  id: string;
  requestFormId: string;
  @Field(() => RequestForm, { nullable: true })
  requestForm: RequestForm;
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
  @Field(() => ItemCategory, { nullable: true })
  category_name: ItemCategory | null;
  @Field(() => String, { nullable: true })
  status: APPROVAL_STATUS;
  @Field(() => [Note], { nullable: true })
  notes: Note[];
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
