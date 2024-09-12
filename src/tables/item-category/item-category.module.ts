import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryResolver } from './item-category.resolver';

@Module({
  providers: [ItemCategoryResolver, ItemCategoryService],
})
export class ItemCategoryModule {}
