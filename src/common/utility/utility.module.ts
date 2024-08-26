import { Module } from '@nestjs/common';
import { UtilityService } from './utility.service';
import { LoggersService } from '../log/log.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UtilityService, LoggersService, JwtService, ConfigService],
})
export class UtilityModule {}
