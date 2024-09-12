import { Module } from '@nestjs/common';
import { UnitOfMeasurementService } from './unit-of-measurement.service';
import { UnitOfMeasurementResolver } from './unit-of-measurement.resolver';

@Module({
  providers: [UnitOfMeasurementResolver, UnitOfMeasurementService],
})
export class UnitOfMeasurementModule {}
