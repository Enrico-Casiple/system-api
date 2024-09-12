import { Injectable } from '@nestjs/common';
import { CreateApprovalUserInput } from './dto/create-approval-user.input';
import { UpdateApprovalUserInput } from './dto/update-approval-user.input';

@Injectable()
export class ApprovalUserService {
  create(createApprovalUserInput: CreateApprovalUserInput) {
    return 'This action adds a new approvalUser';
  }

  findAll() {
    return `This action returns all approvalUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} approvalUser`;
  }

  update(id: number, updateApprovalUserInput: UpdateApprovalUserInput) {
    return `This action updates a #${id} approvalUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} approvalUser`;
  }
}
