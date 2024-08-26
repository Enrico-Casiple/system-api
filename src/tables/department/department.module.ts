import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { RoleService } from '../role/role.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../session/session.service';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    DepartmentResolver,
    DepartmentService,
    PrismaService,
    LoggersService,
    UserAccountService,
    RoleService,
    UtilityService,
    JwtService,
    SessionService,
    SendEmailService,
    ConfigService,
  ],
})
export class DepartmentModule {}
