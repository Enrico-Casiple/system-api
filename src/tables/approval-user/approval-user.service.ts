import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateApprovalUserInput } from './dto/create-approval-user.input';
import { UpdateApprovalUserInput } from './dto/update-approval-user.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class ApprovalUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createApprovalUserInput: CreateApprovalUserInput) {
    try {
      const approvalUser = await this.prismaService.approvalUser.create({
        data: {
          level: createApprovalUserInput.level,
          approver_id: createApprovalUserInput.approver_id,
          item_category_id: createApprovalUserInput.item_category_id,
          approval_id: createApprovalUserInput.approval_id,
        },
        include: {
          approver: true,
          item_category: true,
          approval: true,
        },
      });

      return approvalUser;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalUserService.create()',
      );

      throw new InternalServerErrorException(
        `Error occurred while creating approvalUser: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const approvalUsers = await this.prismaService.approvalUser.findMany({
        include: {
          approver: true,
          item_category: true,
          approval: true,
        },
      });

      return approvalUsers;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalUserService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching approvalUsers: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    if (!id.match(/^[0-9a-fA-F]{24}$/) || !id) {
      this.logger.error('Invalid id', 'ApprovalUserService.findOne()');
      throw new Error('ApprovalUserService.findOne()');
    }

    try {
      const approvalUser = await this.prismaService.approvalUser.findUnique({
        where: { id },
        include: {
          approver: true,
          item_category: true,
          approval: true,
        },
      });

      if (!approvalUser) {
        this.logger.error(
          'ApprovalUser not found',
          'ApprovalUserService.findOne()',
        );
        throw new Error('ApprovalUser not found');
      }

      return approvalUser;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalUserService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching approvalUser: ${error.message}`,
      );
    }
  }

  async update(id: string, updateApprovalUserInput: UpdateApprovalUserInput) {
    try {
      await this.findOne(id);

      const approvalUser = await this.prismaService.approvalUser.update({
        where: { id },
        data: {
          level: updateApprovalUserInput.level,
          approver_id: updateApprovalUserInput.approver_id,
          item_category_id: updateApprovalUserInput.item_category_id,
          approval_id: updateApprovalUserInput.approval_id,
        },
        include: {
          approver: true,
          item_category: true,
          approval: true,
        },
      });

      return approvalUser;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalUserService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating approvalUser: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.approvalUser.delete({
        where: { id },
      });
      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalUserService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing approvalUser: ${error.message}`,
      );
    }
  }
}
