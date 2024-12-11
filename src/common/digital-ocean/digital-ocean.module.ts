import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggersService } from '../log/log.service';
import { DigitalOceanService } from './digital-ocean.service';

@Module({
  providers: [DigitalOceanService, ConfigService, LoggersService],
  exports: [DigitalOceanService],
})
export class DigitalOceanModule {}
