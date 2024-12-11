import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { RoleService } from '../role/role.service';
import { SessionService } from '../session/session.service';
import { UserAccountService } from '../user-account/user-account.service';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';

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
    ConfigService,
  ],
})
export class CompanyModule {}
