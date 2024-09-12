import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class ApprovalService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createApprovalInput: CreateApprovalInput) {
    try {
      const create = await this.prismaService.approval.create({
        data: {
          name: createApprovalInput.name,
          description: createApprovalInput.description,
          user_approval:
            createApprovalInput.user_approval_id.length > 0
              ? {
                  createMany: {
                    data: createApprovalInput.user_approval.map((user) => {
                      return {
                        level: user.level,
                        approver_id: user.approver_id,
                      };
                    }),
                  },
                }
              : undefined,
        },
        include: {
          user_approval: true,
          requestion_forms: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ApprovalService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating approval: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const approvals = await this.prismaService.approval.findMany({
        include: {
          user_approval: true,
          requestion_forms: true,
        },
      });
      return approvals;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching approvals: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      // Check if the id Is MongoObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/) || !id) {
        this.logger.error('Invalid id', 'ApprovalService.findOne()');
        throw new Error('Invalid id');
      }

      const approval = await this.prismaService.approval.findUnique({
        where: {
          id: id,
        },
        include: {
          user_approval: true,
          requestion_forms: true,
        },
      });

      if (!approval) {
        this.logger.error('No approval found', 'ApprovalService.findOne()');
        throw new InternalServerErrorException('No approval found');
      }

      return approval;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ApprovalService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching approval: ${error.message}`,
      );
    }
  }

  async update(id: string, updateApprovalInput: UpdateApprovalInput) {
    try {
      await this.findOne(id);
      const update = await this.prismaService.approval.update({
        where: {
          id: id,
        },
        data: {
          name: updateApprovalInput.name,
          description: updateApprovalInput.description,
          user_approval:
            updateApprovalInput.user_approval_id.length > 0
              ? {
                  deleteMany: {},
                  createMany: {
                    data: updateApprovalInput.user_approval.map((user) => {
                      return {
                        level: user.level,
                        approver_id: user.approver_id,
                        item_category_id: user.item_category_id ?? null,
                      };
                    }),
                  },
                }
              : undefined,
        },
        include: {
          user_approval: true,
          requestion_forms: true,
        },
      });

      return update;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ApprovalService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating approval: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);

      const approval = await this.prismaService.approval.delete({
        where: {
          id: id,
        },
        include: {
          user_approval: true,
          requestion_forms: true,
        },
      });
      return approval;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ApprovalService.remove()');
      throw new InternalServerErrorException(
        `Error occurred while removing approval: ${error.message}`,
      );
    }
  }
}
