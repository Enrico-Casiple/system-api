import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UtilityService } from 'src/common/utility/utility.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    LoggersService,
    UtilityService,
    JwtService,
  ],
})
export class UserModule {}
