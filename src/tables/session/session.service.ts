import { Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';

@Injectable()
export class SessionService {
  create(createSessionInput: CreateSessionInput) {
    console.log('createSessionInput', createSessionInput);
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: string) {
    return `This action returns a #${id} session`;
  }

  update(id: string, updateSessionInput: UpdateSessionInput) {
    console.log('updateSessionInput', updateSessionInput);
    return `This action updates a #${id} session`;
  }

  remove(id: string) {
    return `This action removes a #${id} session`;
  }
}
