import { Module } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApprovalResolver } from './approval.resolver';

@Module({
  providers: [ApprovalResolver, ApprovalService],
})
export class ApprovalModule {}
