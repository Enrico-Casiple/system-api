import { Module } from '@nestjs/common';
import { CheckOutRequestFormService } from './check-out-request-form.service';
import { CheckOutRequestFormResolver } from './check-out-request-form.resolver';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [
    CheckOutRequestFormResolver,
    CheckOutRequestFormService,
    PrismaService,
    LoggersService,
  ],
})
export class CheckOutRequestFormModule {}
