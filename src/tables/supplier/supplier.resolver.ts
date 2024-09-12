import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private readonly supplierService: SupplierService) {}

  @Mutation(() => Supplier)
  createSupplier(
    @Args('createSupplierInput') createSupplierInput: CreateSupplierInput,
  ) {
    const create = this.supplierService.create(createSupplierInput);
    pubsub.publish('supplierCreated', { supplierCreated: create });
    return create;
  }

  @Query(() => [Supplier], { name: 'suppliers' })
  findAll() {
    return this.supplierService.findAll();
  }

  @Query(() => Supplier, { name: 'supplier' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.supplierService.findOne(id);
  }

  @Mutation(() => Supplier)
  updateSupplier(
    @Args('updateSupplierInput') updateSupplierInput: UpdateSupplierInput,
  ) {
    const update = this.supplierService.update(
      updateSupplierInput.id,
      updateSupplierInput,
    );
    pubsub.publish('supplierCreated', { supplierCreated: update });
    return update;
  }

  @Mutation(() => Supplier)
  removeSupplier(@Args('id', { type: () => String }) id: string) {
    const remove = this.supplierService.remove(id);
    pubsub.publish('supplierCreated', { supplierCreated: remove });
    return remove;
  }

  @Subscription(() => Supplier)
  supplierCreated() {
    return pubsub.asyncIterator('supplierCreated');
  }
}
