import { Injectable } from '@nestjs/common';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';

@Injectable()
export class ItemCategoryService {
  create(createItemCategoryInput: CreateItemCategoryInput) {
    return 'This action adds a new itemCategory';
  }

  findAll() {
    return `This action returns all itemCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemCategory`;
  }

  update(id: number, updateItemCategoryInput: UpdateItemCategoryInput) {
    return `This action updates a #${id} itemCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemCategory`;
  }
}
