import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { RoleService } from '../role/role.service';
import { UserAccountService } from '../user-account/user-account.service';

@Module({
  providers: [
    CompanyResolver,
    CompanyService,
    PrismaService,
    LoggersService,
    RoleService,
    UserAccountService,
  ],
})
export class CompanyModule {}
