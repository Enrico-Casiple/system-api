import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CounterService } from 'src/common/counter/counter.service';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { RoleService } from '../role/role.service';
import { SessionService } from '../session/session.service';
import { UserAccountService } from '../user-account/user-account.service';
import { RequestFormResolver } from './request-form.resolver';
import { RequestFormService } from './request-form.service';

@Module({
  providers: [
    RequestFormResolver,
    RequestFormService,
    PrismaService,
    LoggersService,
    UserAccountService,
    SessionService,
    UtilityService,
    JwtService,
    RoleService,
    CounterService,
  ],
})
export class RequestFormModule {}
