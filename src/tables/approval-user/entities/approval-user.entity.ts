import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ApprovalUser as PrismaApprovalUser } from '@prisma/client';
import { Approval } from 'src/tables/approval/entities/approval.entity';
import { ItemCategory } from 'src/tables/item-category/entities/item-category.entity';
import { User } from 'src/tables/user/entities/user.entity';

@ObjectType()
export class ApprovalUser implements PrismaApprovalUser {
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => Int, { nullable: true })
  level: number | null;
  @Field(() => String, { nullable: true })
  approver_id: string | null;
  @Field(() => User, { nullable: true })
  approver: User;
  @Field(() => String, { nullable: true })
  item_category_id: string | null;
  @Field(() => ItemCategory, { nullable: true })
  item_category: ItemCategory;
  @Field(() => String, { nullable: true })
  approval_id: string;
  @Field(() => Approval, { nullable: true })
  approval: Approval;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
