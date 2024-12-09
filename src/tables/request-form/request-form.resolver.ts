import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { APPROVAL_STATUS } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';
import { RequestForm } from './entities/request-form.entity';
import { RequestFormService } from './request-form.service';

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

  @Query(() => [RequestForm], { name: 'findAllRequestForm' })
  findAllRequestForm(
    @Args('startData', { type: () => Date }) startData: Date,
    @Args('endData', { type: () => Date }) endData: Date,
  ) {
    return this.requestFormService.findAllRequestForm(startData, endData);
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

  @Mutation(() => RequestForm)
  async update_status(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => String }) status: string,
  ) {
    const update_status = await this.requestFormService.update_status(
      id,
      status,
    );

    pubSub.publish('requestFormCreated', {
      requestFormCreated: update_status,
    });

    return update_status;
  }
  @Mutation(() => RequestForm, { name: 'approval_process' })
  async approval_process(@Args('id', { type: () => String }) id: string) {
    const approval_process = await this.requestFormService.approval_process(id);
    pubSub.publish('requestFormCreated', {
      requestFormCreated: approval_process,
    });
    return approval_process;
  }

  @Mutation(() => RequestForm, { name: 'verify_request' })
  async verify_request(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => String }) status: string,
    @Args('approval_id', { type: () => String }) approval_id: string,
  ) {
    const verify_request = await this.requestFormService.verify_request(
      id,
      status,
      approval_id,
    );
    pubSub.publish('requestFormCreated', {
      requestFormCreated: verify_request,
    });
    return verify_request;
  }

  @Mutation(() => RequestForm, { name: 'approve_request' })
  async approve_request(
    @Args('approval_process_id', { type: () => String })
    approval_process_id: string,
    @Args('approval_process_status', { type: () => String })
    approval_process_status: APPROVAL_STATUS,
    @Args('request_form_status', { type: () => String, nullable: true })
    request_form_status: string | null,
    @Args('updateRequestFormInput', { nullable: true })
    updateRequestFormInput: UpdateRequestFormInput,
    @Args('currentUser', { type: () => String, nullable: true })
    currentUser: string,
  ) {
    const approve_request = await this.requestFormService.approve_request(
      approval_process_id,
      approval_process_status,
      request_form_status,
      updateRequestFormInput,
      currentUser,
    );
    pubSub.publish('requestFormCreated', {
      requestFormCreated: approve_request,
    });
    return approve_request;
  }

  @Mutation(() => RequestForm, { name: 'reject_request' })
  async reject_request(
    @Args('approval_process_id', { type: () => String })
    approval_process_id: string,
    @Args('approval_process_status', { type: () => String })
    approval_process_status: APPROVAL_STATUS,
    @Args('updateRequestFormInput', { nullable: true })
    updateRequestFormInput: UpdateRequestFormInput,
  ) {
    const reject_request = await this.requestFormService.reject_request(
      approval_process_id,
      approval_process_status,
      updateRequestFormInput,
    );
    pubSub.publish('requestFormCreated', {
      requestFormCreated: reject_request,
    });
    return reject_request;
  }

  @Subscription(() => RequestForm)
  requestFormCreated() {
    return pubSub.asyncIterator('requestFormCreated');
  }
}
