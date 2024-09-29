import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { REQUESTION_STATUS } from '@prisma/client';

@Injectable()
export class RequestFormService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createRequestFormInput: CreateRequestFormInput) {
    try {
      const create = await this.prismaService.requestionForm.create({
        data: {
          name: createRequestFormInput.name,
          description: createRequestFormInput.description,
          user_id: createRequestFormInput.user_id,
          items:
            createRequestFormInput.items.length > 0
              ? {
                  createMany: {
                    data: createRequestFormInput.items.map((item) => {
                      return {
                        name: item.name,
                        description: item.description,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.quantity * item.price,
                        unit_of_measurement_id: item.unit_of_measurement_id,
                        item_category_id: item.item_category_id,
                        supplier_id: item.supplier_id,
                        item_status: item.item_status,
                      };
                    }),
                  },
                }
              : undefined,
          approval_id: createRequestFormInput.approval_id,
          status: createRequestFormInput.status,
          requestForm_category_id:
            createRequestFormInput.requestForm_category_id,
          company_id: createRequestFormInput.company_id,
          isVerified: createRequestFormInput.isVerified,
        },
        include: {
          requester: true,
          items: {
            include: {
              unit_of_measurement: true,
              item_category: true,
              supplier: true,
            },
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: {
                    include: {
                      user_approval: true,
                    },
                  },
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: true,
        },
      });
      return create;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.create()',
      );
      throw new InternalServerErrorException(
        `Error occurred while creating requestForm: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const requestForm = await this.prismaService.requestionForm.findMany({
        include: {
          requester: {
            include: {
              companies: {
                include: {
                  company: true,
                },
              },
              departments: {
                include: {
                  department: true,
                },
              },
            },
          },
          items: true,
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: {
                    include: {
                      user_approval: true,
                    },
                  },
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: true,
        },
      });

      return requestForm;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestForm: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/) || !id) {
        this.logger.error('Invalid id', 'RequestFormService.findOne()');
        throw new BadRequestException('Invalid id');
      }
      const requestForm = await this.prismaService.requestionForm.findUnique({
        where: { id },
        include: {
          requester: {
            include: {
              companies: {
                include: {
                  company: true,
                },
              },
              departments: {
                include: {
                  department: true,
                },
              },
            },
          },
          items: true,
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: {
                    include: {
                      user_approval: true,
                    },
                  },
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          notes: true,
          company: true,
        },
      });

      if (!requestForm) {
        this.logger.error(
          'Request form not found',
          'RequestFormService.findOne()',
        );
        throw new BadRequestException('Request form not found');
      }

      return requestForm;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestForm: ${error.message}`,
      );
    }
  }

  async update(id: string, updateRequestFormInput: UpdateRequestFormInput) {
    try {
      await this.findOne(id);
      

      const update = await this.prismaService.requestionForm.update({
        where: { id },
        data: {
          name: updateRequestFormInput.name,
          description: updateRequestFormInput.description,
          user_id: updateRequestFormInput.user_id,
          items:
            updateRequestFormInput.items.length > 0
              ? {
                  deleteMany: {},
                  createMany: {
                    data: updateRequestFormInput.items.map((item) => {
                      return {
                        name: item.name,
                        description: item.description,
                        quantity: item.quantity,
                        price: item.price,
                        total_price: item.quantity * item.price,
                        unit_of_measurement_id: item.unit_of_measurement_id,
                        item_category_id: item.item_category_id,
                        supplier_id:
                          item.supplier_id === '' ? null : item.supplier_id,
                        item_status: item.item_status,
                      };
                    }),
                  },
                }
              : undefined,
          approval_id:
            updateRequestFormInput.approval_id === ''
              ? null
              : updateRequestFormInput.approval_id,
          status: updateRequestFormInput.status,
          requestForm_category_id:
            updateRequestFormInput.requestForm_category_id,
          company_id:
            updateRequestFormInput.company_id === ''
              ? null
              : updateRequestFormInput.company_id,
          isVerified: updateRequestFormInput.isVerified,
        },
        include: {
          requester: true,
          items: true,
          approval: true,
          requestForm_category: true,
          company: true,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating requestForm: ${error.message}`,
      );
    }
  }

  async updateStatus(id: string, status: REQUESTION_STATUS, remarks: string, isVerified: boolean) { 
    try {
      const requestStatus = await this.findOne(id);
      const update = await this.prismaService.requestionForm.update({
        where: { id },
        data: {
          isVerified,
          status,
          notes: {
            create: {
              name: `Status changed from ${requestStatus.status} to ${status} with remarks:`,
              description: remarks,
              logs: `
                Previous status: ${requestStatus.status}
                New status: ${status}
                user: ${requestStatus.requester.email}
                time: ${new Date().toISOString()}
              `,
            },
          },
        },
        include: {
          requester: {
            include: {
              companies: {
                include: {
                  company: true,
                },
              },
              departments: {
                include: {
                  department: true,
                },
              },
            },
          },
          items: true,
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: {
                    include: {
                      user_approval: true,
                    },
                  },
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: true,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.updateStatus()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating requestForm status: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.requestionForm.delete({
        where: { id },
      });

      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing requestForm: ${error.message}`,
      );
    }
  }
}
