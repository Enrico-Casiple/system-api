import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateApprovalInput } from './dto/create-approval.input';
import { UpdateApprovalInput } from './dto/update-approval.input';

@Injectable()
export class ApprovalService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createApprovalInput: CreateApprovalInput) {
    try {
      const approval = await this.prismaService.approval.create({
        data: {
          name: createApprovalInput.name,
          description: createApprovalInput.description,
          user_approval: {
            createMany: {
              data: createApprovalInput.user_approval.map((user) => {
                return {
                  level: user.level,
                  approver_type: user.approver_type,
                  approver_id: user.approver_id || null,
                  enable_condition: user.enable_condition,
                  item_category_id: user.item_category_id || null,
                  status: user.status || 'PENDING',
                };
              }),
            },
          },
        },
        include: {
          user_approval: {
            include: {
              approver: true,
              item_category: true,
            },
          },
        },
      });
      return approval;
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
          user_approval: {
            include: {
              approver: true,
              item_category: true,
            },
          },
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
          user_approval: {
            include: {
              approver: true,
              item_category: true,
            },
          },
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

      const approval = await this.prismaService.approval.update({
        where: {
          id,
        },
        data: {
          name: updateApprovalInput.name,
          description: updateApprovalInput.description,
          user_approval: {
            deleteMany: {},
            createMany: {
              data: updateApprovalInput.user_approval.map((user) => {
                return {
                  level: user.level,
                  approver_type: user.approver_type,
                  approver_id: user.approver_id || null,
                  enable_condition: user.enable_condition,
                  item_category_id: user.item_category_id || null,
                };
              }),
            },
          },
        },
        include: {
          user_approval: {
            include: {
              approver: true,
              item_category: true,
            },
          },
        },
      });

      return approval;
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
          user_approval: {
            include: {
              approver: true,
              item_category: true,
            },
          },
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
