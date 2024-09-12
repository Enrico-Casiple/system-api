import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { ItemCategoryService } from './item-category.service';
import { ItemCategory } from './entities/item-category.entity';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => ItemCategory)
export class ItemCategoryResolver {
  constructor(private readonly itemCategoryService: ItemCategoryService) {}

  @Mutation(() => ItemCategory)
  createItemCategory(
    @Args('createItemCategoryInput')
    createItemCategoryInput: CreateItemCategoryInput,
  ) {
    const create = this.itemCategoryService.create(createItemCategoryInput);
    pubSub.publish('itemCategoryCreated', { itemCategoryCreated: create });
    return create;
  }

  @Query(() => [ItemCategory], { name: 'itemCategory' })
  findAll() {
    return this.itemCategoryService.findAll();
  }

  @Query(() => ItemCategory, { name: 'itemCategory' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itemCategoryService.findOne(id);
  }

  @Mutation(() => ItemCategory)
  updateItemCategory(
    @Args('updateItemCategoryInput')
    updateItemCategoryInput: UpdateItemCategoryInput,
  ) {
    const update = this.itemCategoryService.update(
      updateItemCategoryInput.id,
      updateItemCategoryInput,
    );
    pubSub.publish('itemCategoryCreated', { itemCategoryCreated: update });
    return update;
  }

  @Mutation(() => ItemCategory)
  removeItemCategory(@Args('id', { type: () => String }) id: string) {
    const remove = this.itemCategoryService.remove(id);
    pubSub.publish('itemCategoryCreated', { itemCategoryCreated: remove });
    return remove;
  }

  @Subscription(() => ItemCategory)
  async itemCategoryCreated() {
    return pubSub.asyncIterator('itemCategoryCreated');
  }
}
