import { Injectable } from '@nestjs/common';
import { CreateCheckOutRequestFormInput } from './dto/create-check-out-request-form.input';
import { UpdateCheckOutRequestFormInput } from './dto/update-check-out-request-form.input';

@Injectable()
export class CheckOutRequestFormService {
  create(createCheckOutRequestFormInput: CreateCheckOutRequestFormInput) {
    return 'This action adds a new checkOutRequestForm';
  }

  findAll() {
    return `This action returns all checkOutRequestForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkOutRequestForm`;
  }

  update(id: number, updateCheckOutRequestFormInput: UpdateCheckOutRequestFormInput) {
    return `This action updates a #${id} checkOutRequestForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkOutRequestForm`;
  }
}
