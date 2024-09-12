import { Module } from '@nestjs/common';
import { RequestFormService } from './request-form.service';
import { RequestFormResolver } from './request-form.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [
    RequestFormResolver,
    RequestFormService,
    PrismaService,
    LoggersService,
  ],
})
export class RequestFormModule {}
