import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { ConfigService } from '@nestjs/config';

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
    SendEmailService,
    ConfigService,
  ],
})
export class RoleModule {}
