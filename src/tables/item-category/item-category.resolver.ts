import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemCategoryService } from './item-category.service';
import { ItemCategory } from './entities/item-category.entity';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';

@Resolver(() => ItemCategory)
export class ItemCategoryResolver {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @Mutation(() => ItemCategory)
  createItemCategory(@Args('createItemCategoryInput') createItemCategoryInput: CreateItemCategoryInput) {
    return this.itemCategoryService.create(createItemCategoryInput);
  }

  @Query(() => [ItemCategory], { name: 'itemCategory' })
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Query(() => ItemCategory, { name: 'itemCategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoryService.findOne(id);
  }

  @Mutation(() => ItemCategory)
  updateItemCategory(@Args('updateItemCategoryInput') updateItemCategoryInput: UpdateItemCategoryInput) {
    return this.itemCategoryService.update(updateItemCategoryInput.id, updateItemCategoryInput);
  }

  @Mutation(() => ItemCategory)
  removeItemCategory(@Args('id', { type: () => Int }) id: number) {
    return this.itemCategoryService.remove(id);
  }
}
