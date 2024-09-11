import { Injectable } from '@nestjs/common';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';

@Injectable()
export class RequestFormService {
  create(createRequestFormInput: CreateRequestFormInput) {
    return 'This action adds a new requestForm';
  }

  findAll() {
    return `This action returns all requestForm`;
  }

  findOne(id: string) {
    return `This action returns a #${id} requestForm`;
  }

  update(id: string, updateRequestFormInput: UpdateRequestFormInput) {
    return `This action updates a #${id} requestForm`;
  }

  remove(id: string) {
    return `This action removes a #${id} requestForm`;
  }
}
