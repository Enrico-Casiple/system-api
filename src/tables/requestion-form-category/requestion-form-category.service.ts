import { Injectable } from '@nestjs/common';
import { CreateRequestionFormCategoryInput } from './dto/create-requestion-form-category.input';
import { UpdateRequestionFormCategoryInput } from './dto/update-requestion-form-category.input';

@Injectable()
export class RequestionFormCategoryService {
  create(createRequestionFormCategoryInput: CreateRequestionFormCategoryInput) {
    return 'This action adds a new requestionFormCategory';
  }

  findAll() {
    return `This action returns all requestionFormCategory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} requestionFormCategory`;
  }

  update(
    id: string,
    updateRequestionFormCategoryInput: UpdateRequestionFormCategoryInput,
  ) {
    return `This action updates a #${id} requestionFormCategory`;
  }

  remove(id: string) {
    return `This action removes a #${id} requestionFormCategory`;
  }
}
