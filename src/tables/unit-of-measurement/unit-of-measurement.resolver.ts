import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UnitOfMeasurementService } from './unit-of-measurement.service';
import { UnitOfMeasurement } from './entities/unit-of-measurement.entity';
import { CreateUnitOfMeasurementInput } from './dto/create-unit-of-measurement.input';
import { UpdateUnitOfMeasurementInput } from './dto/update-unit-of-measurement.input';

@Resolver(() => UnitOfMeasurement)
export class UnitOfMeasurementResolver {
  constructor(private readonly unitOfMeasurementService: UnitOfMeasurementService) {}

  @Mutation(() => UnitOfMeasurement)
  createUnitOfMeasurement(@Args('createUnitOfMeasurementInput') createUnitOfMeasurementInput: CreateUnitOfMeasurementInput) {
    return this.unitOfMeasurementService.create(createUnitOfMeasurementInput);
  }

  @Query(() => [UnitOfMeasurement], { name: 'unitOfMeasurement' })
  findAll() {
    return this.unitOfMeasurementService.findAll();
  }

  @Query(() => UnitOfMeasurement, { name: 'unitOfMeasurement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.unitOfMeasurementService.findOne(id);
  }

  @Mutation(() => UnitOfMeasurement)
  updateUnitOfMeasurement(@Args('updateUnitOfMeasurementInput') updateUnitOfMeasurementInput: UpdateUnitOfMeasurementInput) {
    return this.unitOfMeasurementService.update(updateUnitOfMeasurementInput.id, updateUnitOfMeasurementInput);
  }

  @Mutation(() => UnitOfMeasurement)
  removeUnitOfMeasurement(@Args('id', { type: () => Int }) id: number) {
    return this.unitOfMeasurementService.remove(id);
  }
}
