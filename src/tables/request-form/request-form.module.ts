import { Module } from '@nestjs/common';
import { RequestFormService } from './request-form.service';
import { RequestFormResolver } from './request-form.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { SessionService } from '../session/session.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { SendEmailService } from 'src/common/send-email/send-email.service';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { CounterService } from 'src/common/counter/counter.service';
import { ItemCategoryService } from '../item-category/item-category.service';

@Module({
  providers: [
    RequestFormResolver,
    RequestFormService,
    PrismaService,
    LoggersService,
    UserAccountService,
    SessionService,
    UtilityService,
    SendEmailService,
    JwtService,
    RoleService,
    CounterService,
  ],
})
export class RequestFormModule {}
