import { CreateNoteInput } from './create-note.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field(() => String, { nullable: true })
  id: string;
}
