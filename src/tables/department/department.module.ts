import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { RoleService } from '../role/role.service';
import { SessionService } from '../session/session.service';
import { UserAccountService } from '../user-account/user-account.service';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';

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
    ConfigService,
  ],
})
export class DepartmentModule {}
