import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionResolver } from './session.resolver';
import { LoggersService } from 'src/common/log/log.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { UserAccountService } from '../user-account/user-account.service';
import { JwtService } from '@nestjs/jwt';
import { SendEmailService } from 'src/common/send-email/send-email.service';

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
    SendEmailService,
  ],
})
export class SessionModule {}
