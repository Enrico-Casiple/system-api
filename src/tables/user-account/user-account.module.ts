import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessStrategy } from 'src/common/auth/strategy/access.strategy';
import { RefreshStrategy } from 'src/common/auth/strategy/refresh.strategy';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { SessionService } from '../session/session.service';
import { UserAccountResolver } from './user-account.resolver';
import { UserAccountService } from './user-account.service';

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
    ConfigService,
  ],
})
export class UserAccountModule {}
