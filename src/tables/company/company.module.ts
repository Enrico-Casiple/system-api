import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { RoleService } from '../role/role.service';
import { UserAccountService } from '../user-account/user-account.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    CompanyResolver,
    CompanyService,
    PrismaService,
    LoggersService,
    RoleService,
    UserAccountService,
    UtilityService,
    JwtService,
    SessionService,
    SendEmailService,
    ConfigService,
  ],
})
export class CompanyModule {}
