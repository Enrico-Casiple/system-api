import { ObjectType, Field } from '@nestjs/graphql';
import { REQUESTION_STATUS } from '@prisma/client';
import { Note } from 'src/tables/notes/entities/note.entity';
import { User } from 'src/tables/user/entities/user.entity';
import { RequestionForm as PrismaRequestionForm } from '@prisma/client';

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
  // items: string;
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  // approval: string;
  @Field(() => String, { nullable: true })
  status: REQUESTION_STATUS;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  // requestForm_category: string;
  @Field(() => [Note], { nullable: true })
  notes: Note[];
  // CheckOutRequestForm: string;
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
