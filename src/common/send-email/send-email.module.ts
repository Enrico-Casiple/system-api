import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggersService } from '../log/log.service';

@Module({
  providers: [LoggersService, ConfigService],
})
export class SendEmailModule {}
