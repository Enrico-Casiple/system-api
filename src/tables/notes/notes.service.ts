import { Injectable } from '@nestjs/common';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NotesService {
  create(createNoteInput: CreateNoteInput) {
    console.log(createNoteInput);
    return 'This action adds a new note';
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: string) {
    return `This action returns a #${id} note`;
  }

  update(id: string, updateNoteInput: UpdateNoteInput) {
    console.log(updateNoteInput);
    return `This action updates a #${id} note`;
  }

  remove(id: string) {
    return `This action removes a #${id} note`;
  }
}
