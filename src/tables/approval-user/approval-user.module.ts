import { Module } from '@nestjs/common';
import { ApprovalUserService } from './approval-user.service';
import { ApprovalUserResolver } from './approval-user.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [
    ApprovalUserResolver,
    ApprovalUserService,
    PrismaService,
    LoggersService,
  ],
})
export class ApprovalUserModule {}
