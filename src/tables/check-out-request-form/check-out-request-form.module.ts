import { Module } from '@nestjs/common';
import { CheckOutRequestFormService } from './check-out-request-form.service';
import { CheckOutRequestFormResolver } from './check-out-request-form.resolver';

@Module({
  providers: [CheckOutRequestFormResolver, CheckOutRequestFormService],
})
export class CheckOutRequestFormModule {}
