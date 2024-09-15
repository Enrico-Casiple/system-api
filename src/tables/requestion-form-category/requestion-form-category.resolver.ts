import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RequestionFormCategoryService } from './requestion-form-category.service';
import { RequestionFormCategory } from './entities/requestion-form-category.entity';
import { CreateRequestionFormCategoryInput } from './dto/create-requestion-form-category.input';
import { UpdateRequestionFormCategoryInput } from './dto/update-requestion-form-category.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => RequestionFormCategory)
export class RequestionFormCategoryResolver {
  constructor(
    private readonly requestionFormCategoryService: RequestionFormCategoryService,
  ) {}

  @Mutation(() => RequestionFormCategory)
  createRequestionFormCategory(
    @Args('createRequestionFormCategoryInput')
    createRequestionFormCategoryInput: CreateRequestionFormCategoryInput,
  ) {
    const create = this.requestionFormCategoryService.create(
      createRequestionFormCategoryInput,
    );
    pubSub.publish('requestionFormCategoryCreated', {
      requestionFormCategoryCreated: create,
    });
    return create;
  }

  @Query(() => [RequestionFormCategory], { name: 'requestionFormCategories' })
  findAll() {
    return this.requestionFormCategoryService.findAll();
  }

  @Query(() => RequestionFormCategory, { name: 'requestionFormCategory' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.requestionFormCategoryService.findOne(id);
  }

  @Mutation(() => RequestionFormCategory)
  updateRequestionFormCategory(
    @Args('updateRequestionFormCategoryInput')
    updateRequestionFormCategoryInput: UpdateRequestionFormCategoryInput,
  ) {
    const udpate = this.requestionFormCategoryService.update(
      updateRequestionFormCategoryInput.id,
      updateRequestionFormCategoryInput,
    );
    pubSub.publish('requestionFormCategoryCreated', {
      requestionFormCategoryCreated: udpate,
    });
    return udpate;
  }

  @Mutation(() => RequestionFormCategory)
  removeRequestionFormCategory(@Args('id', { type: () => String }) id: string) {
    const remove = this.requestionFormCategoryService.remove(id);
    pubSub.publish('requestionFormCategoryCreated', {
      requestionFormCategoryCreated: remove,
    });
    return remove;
  }

  @Subscription(() => RequestionFormCategory)
  requestionFormCategoryCreated() {
    return pubSub.asyncIterator('requestionFormCategoryCreated');
  }
}
