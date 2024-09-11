import { Module } from '@nestjs/common';
import { RequestFormService } from './request-form.service';
import { RequestFormResolver } from './request-form.resolver';

@Module({
  providers: [RequestFormResolver, RequestFormService],
})
export class RequestFormModule {}
