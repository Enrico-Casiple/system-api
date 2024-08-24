import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { RoleService } from '../role/role.service';

@Module({
  providers: [
    DepartmentResolver,
    DepartmentService,
    PrismaService,
    LoggersService,
    UserAccountService,
    RoleService,
  ],
})
export class DepartmentModule {}
