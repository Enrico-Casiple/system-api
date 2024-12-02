import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(
    @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  ) {
    const company = this.companyService.create(createCompanyInput);

    pubSub.publish('companyAdded', { companyAdded: company });

    return company;
  }

  @Query(() => [Company], { name: 'companies' })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: 'company' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.companyService.findOne(id);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  ) {
    const company = this.companyService.update(
      updateCompanyInput.id,
      updateCompanyInput,
    );

    pubSub.publish('companyAdded', { companyAdded: company });

    return company;
  }

  @Mutation(() => Company)
  removeCompany(@Args('id', { type: () => String }) id: string) {
    const company = this.companyService.remove(id);

    pubSub.publish('companyAdded', { companyAdded: company });

    return company;
  }

  @Subscription(() => Company)
  companyAdded() {
    return pubSub.asyncIterator('companyAdded');
  }
}
