import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CheckOutRequestFormService } from './check-out-request-form.service';
import { CheckOutRequestForm } from './entities/check-out-request-form.entity';
import { CreateCheckOutRequestFormInput } from './dto/create-check-out-request-form.input';
import { UpdateCheckOutRequestFormInput } from './dto/update-check-out-request-form.input';

@Resolver(() => CheckOutRequestForm)
export class CheckOutRequestFormResolver {
  constructor(private readonly checkOutRequestFormService: CheckOutRequestFormService) {}

  @Mutation(() => CheckOutRequestForm)
  createCheckOutRequestForm(@Args('createCheckOutRequestFormInput') createCheckOutRequestFormInput: CreateCheckOutRequestFormInput) {
    return this.checkOutRequestFormService.create(createCheckOutRequestFormInput);
  }

  @Query(() => [CheckOutRequestForm], { name: 'checkOutRequestForm' })
  findAll() {
    return this.checkOutRequestFormService.findAll();
  }

  @Query(() => CheckOutRequestForm, { name: 'checkOutRequestForm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.checkOutRequestFormService.findOne(id);
  }

  @Mutation(() => CheckOutRequestForm)
  updateCheckOutRequestForm(@Args('updateCheckOutRequestFormInput') updateCheckOutRequestFormInput: UpdateCheckOutRequestFormInput) {
    return this.checkOutRequestFormService.update(updateCheckOutRequestFormInput.id, updateCheckOutRequestFormInput);
  }

  @Mutation(() => CheckOutRequestForm)
  removeCheckOutRequestForm(@Args('id', { type: () => Int }) id: number) {
    return this.checkOutRequestFormService.remove(id);
  }
}
