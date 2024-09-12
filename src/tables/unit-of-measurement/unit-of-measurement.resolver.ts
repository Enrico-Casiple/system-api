import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UnitOfMeasurementService } from './unit-of-measurement.service';
import { UnitOfMeasurement } from './entities/unit-of-measurement.entity';
import { CreateUnitOfMeasurementInput } from './dto/create-unit-of-measurement.input';
import { UpdateUnitOfMeasurementInput } from './dto/update-unit-of-measurement.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => UnitOfMeasurement)
export class UnitOfMeasurementResolver {
  constructor(
    private readonly unitOfMeasurementService: UnitOfMeasurementService,
  ) {}

  @Mutation(() => UnitOfMeasurement)
  createUnitOfMeasurement(
    @Args('createUnitOfMeasurementInput')
    createUnitOfMeasurementInput: CreateUnitOfMeasurementInput,
  ) {
    const create = this.unitOfMeasurementService.create(
      createUnitOfMeasurementInput,
    );
    pubSub.publish('unitOfMeasurementCreated', {
      unitOfMeasurementCreated: create,
    });
    return create;
  }

  @Query(() => [UnitOfMeasurement], { name: 'unitOfMeasurements' })
  findAll() {
    return this.unitOfMeasurementService.findAll();
  }

  @Query(() => UnitOfMeasurement, { name: 'unitOfMeasurement' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.unitOfMeasurementService.findOne(id);
  }

  @Mutation(() => UnitOfMeasurement)
  updateUnitOfMeasurement(
    @Args('updateUnitOfMeasurementInput')
    updateUnitOfMeasurementInput: UpdateUnitOfMeasurementInput,
  ) {
    const update = this.unitOfMeasurementService.update(
      updateUnitOfMeasurementInput.id,
      updateUnitOfMeasurementInput,
    );
    pubSub.publish('unitOfMeasurementCreated', {
      unitOfMeasurementCreated: update,
    });
    return update;
  }

  @Mutation(() => UnitOfMeasurement)
  removeUnitOfMeasurement(@Args('id', { type: () => String }) id: string) {
    const remove = this.unitOfMeasurementService.remove(id);
    pubSub.publish('unitOfMeasurementCreated', {
      unitOfMeasurementCreated: remove,
    });
    return remove;
  }

  @Subscription(() => UnitOfMeasurement)
  unitOfMeasurementCreated() {
    return pubSub.asyncIterator('unitOfMeasurementCreated');
  }
}
