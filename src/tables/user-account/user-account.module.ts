import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountResolver } from './user-account.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [
    UserAccountResolver,
    UserAccountService,
    PrismaService,
    LoggersService,
  ],
})
export class UserAccountModule {}
