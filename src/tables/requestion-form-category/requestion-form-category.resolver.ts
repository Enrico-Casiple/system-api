import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestionFormCategoryService } from './requestion-form-category.service';
import { RequestionFormCategory } from './entities/requestion-form-category.entity';
import { CreateRequestionFormCategoryInput } from './dto/create-requestion-form-category.input';
import { UpdateRequestionFormCategoryInput } from './dto/update-requestion-form-category.input';

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
    return this.requestionFormCategoryService.create(
      createRequestionFormCategoryInput,
    );
  }

  @Query(() => [RequestionFormCategory], { name: 'requestionFormCategory' })
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
    return this.requestionFormCategoryService.update(
      updateRequestionFormCategoryInput.id,
      updateRequestionFormCategoryInput,
    );
  }

  @Mutation(() => RequestionFormCategory)
  removeRequestionFormCategory(@Args('id', { type: () => String }) id: string) {
    return this.requestionFormCategoryService.remove(id);
  }
}
