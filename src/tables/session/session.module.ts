import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { UserAccountService } from '../user-account/user-account.service';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  providers: [
    SessionResolver,
    SessionService,
    LoggersService,
    ConfigService,
    PrismaService,
    UtilityService,
    UserAccountService,
    JwtService,
  ],
})
export class SessionModule {}
