import { Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  create(createItemInput: CreateItemInput) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: string) {
    return `This action returns a #${id} item`;
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
