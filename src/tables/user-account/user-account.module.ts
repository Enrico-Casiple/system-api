import { Module } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { UserAccountResolver } from './user-account.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UtilityService } from 'src/common/utility/utility.service';
import { AccessStrategy } from 'src/common/auth/strategy/access.strategy';
import { RefreshStrategy } from 'src/common/auth/strategy/refresh.strategy';
import { SessionService } from '../session/session.service';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    UserAccountResolver,
    UserAccountService,
    PrismaService,
    LoggersService,
    UtilityService,
    JwtService,
    AccessStrategy,
    RefreshStrategy,
    SessionService,
    SendEmailService,
    ConfigService,
  ],
})
export class UserAccountModule {}
