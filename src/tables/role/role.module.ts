import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { SessionService } from '../session/session.service';
import { UserAccountService } from '../user-account/user-account.service';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  providers: [
    RoleResolver,
    RoleService,
    PrismaService,
    LoggersService,
    UserAccountService,
    UtilityService,
    JwtService,
    SessionService,
    ConfigService,
  ],
})
export class RoleModule {}
