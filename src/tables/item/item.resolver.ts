import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ITEM_STATUS } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { RequestItem } from '../request-form/entities/request-form.entity';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';

const pubSub = new PubSub();

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    const createItem = this.itemService.create(createItemInput);
    pubSub.publish('itemAdded', { itemAdded: createItem });
    return createItem;
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    const updateItem = this.itemService.update(
      updateItemInput.id,
      updateItemInput,
    );
    pubSub.publish('itemAdded', { itemAdded: updateItem });
    return updateItem;
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => String }) id: string) {
    return this.itemService.remove(id);
  }

  @Mutation(() => RequestItem)
  item_status_update(
    @Args('id', { type: () => String }) id: string,
    @Args('item_status', { type: () => String }) item_status: ITEM_STATUS,
  ) {
    return this.itemService.item_status_update(id, item_status);
  }

  @Subscription(() => Item)
  itemAdded() {
    return pubSub.asyncIterator('itemAdded');
  }
}
