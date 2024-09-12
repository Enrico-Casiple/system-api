import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { RequestFormService } from './request-form.service';
import { RequestForm } from './entities/request-form.entity';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => RequestForm)
export class RequestFormResolver {
  constructor(private readonly requestFormService: RequestFormService) {}

  @Mutation(() => RequestForm)
  createRequestForm(
    @Args('createRequestFormInput')
    createRequestFormInput: CreateRequestFormInput,
  ) {
    const create = this.requestFormService.create(createRequestFormInput);
    pubSub.publish('requestFormCreated', { requestFormCreated: create });
    return create;
  }

  @Query(() => [RequestForm], { name: 'requestForms' })
  findAll() {
    return this.requestFormService.findAll();
  }

  @Query(() => RequestForm, { name: 'requestForm' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.requestFormService.findOne(id);
  }

  @Mutation(() => RequestForm)
  updateRequestForm(
    @Args('updateRequestFormInput')
    updateRequestFormInput: UpdateRequestFormInput,
  ) {
    const update = this.requestFormService.update(
      updateRequestFormInput.id,
      updateRequestFormInput,
    );
    pubSub.publish('requestFormCreated', { requestFormCreated: update });
    return update;
  }

  @Mutation(() => RequestForm)
  removeRequestForm(@Args('id', { type: () => String }) id: string) {
    const remove = this.requestFormService.remove(id);
    pubSub.publish('requestFormCreated', { requestFormCreated: remove });
    return remove;
  }

  @Subscription(() => RequestForm)
  requestFormCreated() {
    return pubSub.asyncIterator('requestFormCreated');
  }
}
