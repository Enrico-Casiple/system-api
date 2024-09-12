import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { CheckOutRequestFormService } from './check-out-request-form.service';
import { CheckOutRequestForm } from './entities/check-out-request-form.entity';
import { CreateCheckOutRequestFormInput } from './dto/create-check-out-request-form.input';
import { UpdateCheckOutRequestFormInput } from './dto/update-check-out-request-form.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => CheckOutRequestForm)
export class CheckOutRequestFormResolver {
  constructor(
    private readonly checkOutRequestFormService: CheckOutRequestFormService,
  ) {}

  @Mutation(() => CheckOutRequestForm)
  createCheckOutRequestForm(
    @Args('createCheckOutRequestFormInput')
    createCheckOutRequestFormInput: CreateCheckOutRequestFormInput,
  ) {
    const create = this.checkOutRequestFormService.create(
      createCheckOutRequestFormInput,
    );
    pubSub.publish('checkOutRequestFormCreated', {
      checkOutRequestFormCreated: create,
    });
    return create;
  }

  @Query(() => [CheckOutRequestForm], { name: 'checkOutRequestForms' })
  findAll() {
    return this.checkOutRequestFormService.findAll();
  }

  @Query(() => CheckOutRequestForm, { name: 'checkOutRequestForm' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.checkOutRequestFormService.findOne(id);
  }

  @Mutation(() => CheckOutRequestForm)
  updateCheckOutRequestForm(
    @Args('updateCheckOutRequestFormInput')
    updateCheckOutRequestFormInput: UpdateCheckOutRequestFormInput,
  ) {
    const update = this.checkOutRequestFormService.update(
      updateCheckOutRequestFormInput.id,
      updateCheckOutRequestFormInput,
    );
    pubSub.publish('checkOutRequestFormCreated', {
      checkOutRequestFormCreated: update,
    });
    return update;
  }

  @Mutation(() => CheckOutRequestForm)
  removeCheckOutRequestForm(@Args('id', { type: () => String }) id: string) {
    const remove = this.checkOutRequestFormService.remove(id);
    pubSub.publish('checkOutRequestFormCreated', {
      checkOutRequestFormCreated: remove,
    });
    return remove;
  }

  @Subscription(() => CheckOutRequestForm)
  checkOutRequestFormCreated() {
    return pubSub.asyncIterator('checkOutRequestFormCreated');
  }
}
