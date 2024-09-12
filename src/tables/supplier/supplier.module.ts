import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [SupplierResolver, SupplierService, PrismaService, LoggersService],
})
export class SupplierModule {}
