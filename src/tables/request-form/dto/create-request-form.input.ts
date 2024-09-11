import { InputType, Field } from '@nestjs/graphql';
import { REQUESTION_STATUS, RequestionForm } from '@prisma/client';
import { CreateNoteInput } from 'src/tables/notes/dto/create-note.input';
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
  // items: string;
  @Field(() => String, { nullable: true })
  approval_id: string | null;
  // approval: string;
  @Field(() => String, { nullable: true })
  status: REQUESTION_STATUS;
  @Field(() => String, { nullable: true })
  requestForm_category_id: string | null;
  // requestForm_category: string;
  @Field(() => [CreateNoteInput], { nullable: true })
  notes: CreateNoteInput[];
  // CheckOutRequestForm: string;
  @Field(() => Boolean, { nullable: true })
  isVerified: boolean;
  @Field(() => Date, { nullable: true })
  created_at: Date;
  @Field(() => Date, { nullable: true })
  updated_at: Date;
}
