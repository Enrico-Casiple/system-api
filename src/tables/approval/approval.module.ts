import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalResolver } from './approval.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [ApprovalResolver, ApprovalService, PrismaService, LoggersService],
})
export class ApprovalModule {}
