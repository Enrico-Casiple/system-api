import { Module } from '@nestjs/common';
import { ApprovalUserService } from './approval-user.service';
import { ApprovalUserResolver } from './approval-user.resolver';

@Module({
  providers: [ApprovalUserResolver, ApprovalUserService],
})
export class ApprovalUserModule {}
