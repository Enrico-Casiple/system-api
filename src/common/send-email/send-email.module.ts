import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { LoggersService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [SendEmailService, LoggersService, ConfigService],
})
export class SendEmailModule {}
