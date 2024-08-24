import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';

@Module({
  providers: [
    RoleResolver,
    RoleService,
    PrismaService,
    LoggersService,
    UserAccountService,
  ],
})
export class RoleModule {}
