import { Module } from '@nestjs/common';
import { UnitOfMeasurementService } from './unit-of-measurement.service';
import { UnitOfMeasurementResolver } from './unit-of-measurement.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [
    UnitOfMeasurementResolver,
    UnitOfMeasurementService,
    PrismaService,
    LoggersService,
  ],
})
export class UnitOfMeasurementModule {}
