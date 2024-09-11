import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RequestFormService } from './request-form.service';
import { RequestForm } from './entities/request-form.entity';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';

@Resolver(() => RequestForm)
export class RequestFormResolver {
  constructor(private readonly requestFormService: RequestFormService) {}

  @Mutation(() => RequestForm)
  createRequestForm(
    @Args('createRequestFormInput')
    createRequestFormInput: CreateRequestFormInput,
  ) {
    return this.requestFormService.create(createRequestFormInput);
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
    return this.requestFormService.update(
      updateRequestFormInput.id,
      updateRequestFormInput,
    );
  }

  @Mutation(() => RequestForm)
  removeRequestForm(@Args('id', { type: () => String }) id: string) {
    return this.requestFormService.remove(id);
  }
}
