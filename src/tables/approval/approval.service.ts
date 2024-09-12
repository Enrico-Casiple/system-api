import { Injectable } from '@nestjs/common';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';

@Injectable()
export class ApprovalService {
  create(createApprovalInput: CreateApprovalInput) {
    return 'This action adds a new approval';
  }

  findAll() {
    return `This action returns all approval`;
  }

  findOne(id: string) {
    return `This action returns a #${id} approval`;
  }

  update(id: string, updateApprovalInput: UpdateApprovalInput) {
    return `This action updates a #${id} approval`;
  }

  remove(id: string) {
    return `This action removes a #${id} approval`;
  }
}
