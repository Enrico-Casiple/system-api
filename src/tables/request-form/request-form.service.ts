import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { APPROVAL_STATUS, APPROVER_TYPE, POSITION } from '@prisma/client';
import { CounterService } from 'src/common/counter/counter.service';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRequestFormInput } from './dto/create-request-form.input';
import { UpdateRequestFormInput } from './dto/update-request-form.input';

@Injectable()
export class RequestFormService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
    private readonly counter: CounterService,
  ) {}

  async create(createRequestFormInput: CreateRequestFormInput) {

    const find_last_purchase_number =
      await this.prismaService.requestionForm.findFirst({
        orderBy: {
          purchase_number: 'desc',
        },
      });

    try {
      const create = await this.prismaService.requestionForm.create({
        data: {
          purchase_number: find_last_purchase_number
            ? find_last_purchase_number.purchase_number + 1
            : 88900,
          user_id: createRequestFormInput.user_id || undefined,
          company_id: createRequestFormInput.company_id || undefined,
          department_id: createRequestFormInput.department_id || undefined,
          status: createRequestFormInput.status || 'PENDING',
          isVerified: false,
          approval_id: createRequestFormInput.approval_id || undefined,
          items:
            createRequestFormInput.items.length > 0
              ? {
                  createMany: {
                    data: createRequestFormInput.items.map((item) => {
                      return {
                        name: item.name,
                        description: item.description,
                        quantity: item.quantity,
                        unit_of_measurement: item.unit_of_measurement,
                        item_category: item.item_category,
                        item_status: item.item_status || 'PENDING',
                      };
                    }),
                  },
                }
              : undefined,
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
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
      const requestForms = await this.prismaService.requestionForm.findMany({
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });

      return requestForms;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestForms: ${error.message}`,
      );
    }
  }

  async findAllRequestForm(startData: Date, endData: Date) {
    try {
      const requestForms = await this.prismaService.requestionForm.findMany({
        where: {
          created_at: {
            gte: startData,
            lte: endData,
          },
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });

      return requestForms;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.findAllRequestForm()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestForms: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const requestForm = await this.prismaService.requestionForm.findUnique({
        where: {
          id,
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });

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
      const update = await this.prismaService.requestionForm.update({
        where: {
          id,
        },
        data: {
          approval_id: updateRequestFormInput.approval_id || undefined,
          company_id: updateRequestFormInput.company_id || undefined,
          department_id: updateRequestFormInput.department_id || undefined,
          status: updateRequestFormInput.status || 'PENDING',
          isVerified: updateRequestFormInput.isVerified,
          items: {
            deleteMany: {},
            createMany: {
              data: updateRequestFormInput.items.map((item) => {
                return {
                  name: item.name,
                  description: item.description,
                  quantity: item.quantity,
                  unit_of_measurement: item.unit_of_measurement,
                  item_category: item.item_category,
                  item_status: item.item_status || 'PENDING',
                };
              }),
            },
          },
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
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

  async remove(id: string) {
    try {
      const remove = await this.prismaService.requestionForm.delete({
        where: {
          id,
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
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

  async update_status(id: string, status: string) {
    try {
      const findOne = await this.findOne(id);

      if (!findOne) {
        throw new BadRequestException('Request not found');
      }

      const update = await this.prismaService.requestionForm.update({
        where: { id },
        data: {
          status,
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });

      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.update_status()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating request status: ${error.message}`,
      );
    }
  }

  async approval_process(id: string) {
    const requestDetails = await this.findOne(id);

    if (!requestDetails) {
      throw new BadRequestException('Request not found');
    }

    const user_manager = requestDetails.requester.departments.map(
      (department) => {
        const manager = department.department.manager_id;
        return manager;
      },
    );

    //Find the depmatment in the request department return the manager id
    const department = requestDetails.requester.departments.find(
      (department) => {
        return department.department_id === requestDetails.department_id;
      },
    );

    const company = (position: POSITION) => {
      if (position === POSITION.MANAGER) {
        return user_manager.find((manger_id) => {
          return requestDetails.company.departments.find((department) => {
            return department.manager_id === manger_id;
          });
        });
      } else if (position === POSITION.PRESIDENT) {
        return requestDetails.company.president_id;
      }
    };

    // check if the the request has an category name of the approval process
    const approval_category_name = requestDetails.approval.user_approval.map(
      (user_approval) => {
        if (
          user_approval.approver_type === APPROVER_TYPE.STATIC_APPROVER &&
          user_approval.enable_condition
        ) {
          const unique_category_name = [
            ...new Set(requestDetails.items.map((item) => item.item_category)),
          ];

          if (unique_category_name.includes(user_approval.item_category.name)) {
            return user_approval.item_category_id;
          }

          return undefined;
        }
      },
    );

    try {
      const approval_workflows = requestDetails.approval.user_approval.map(
        (user_approval) => {
          if (user_approval.approver_type === APPROVER_TYPE.MANAGER_APPROVER) {
            return {
              level: user_approval.level,
              approver_type: user_approval.approver_type,
              approver_id: company(POSITION.MANAGER),
              enable_condition: user_approval.enable_condition,
              category_name: user_approval.item_category_id || null,
              status: user_approval.status,
            };
          } else if (
            user_approval.approver_type === APPROVER_TYPE.PRESIDENT_APPROVER
          ) {
            return {
              level: user_approval.level,
              approver_type: user_approval.approver_type,
              approver_id: company(POSITION.PRESIDENT),
              enable_condition: user_approval.enable_condition,
              category_name: user_approval.item_category_id || null,
              status: user_approval.status,
            };
          } else if (
            user_approval.approver_type === APPROVER_TYPE.STATIC_APPROVER &&
            !user_approval.enable_condition
          ) {
            return {
              level: user_approval.level,
              approver_type: user_approval.approver_type,
              approver_id: user_approval.approver_id,
              enable_condition: user_approval.enable_condition,
              category_name: user_approval.item_category_id || null,
              status: user_approval.status,
            };
          } else if (
            user_approval.approver_type === APPROVER_TYPE.STATIC_APPROVER &&
            user_approval.enable_condition &&
            approval_category_name
              .filter((name) => name !== undefined)
              .includes(user_approval.item_category_id)
          ) {
            return {
              level: user_approval.level,
              approver_type: user_approval.approver_type,
              approver_id: user_approval.approver_id,
              enable_condition: user_approval.enable_condition,
              category_name: user_approval.item_category_id || null,
              status: user_approval.status,
            };
          }
        },
      );

      const filter_approval_workflows = approval_workflows.filter(
        (workflow) => workflow !== undefined,
      );

      const approver_process = await this.prismaService.requestionForm.upsert({
        where: { id },
        create: {
          approval_process: {
            createMany: {
              data: filter_approval_workflows.map((workflow) => {
                return {
                  level: workflow.level,
                  approver_type: workflow.approver_type,
                  approver_id: workflow.approver_id,
                  enable_condition: workflow.enable_condition,
                  categoty_name_id: workflow.category_name || null,
                  status: workflow.status,
                };
              }),
            },
          },
        },
        update: {
          approval_process: {
            deleteMany: {},
            createMany: {
              data: filter_approval_workflows.map((workflow) => {
                return {
                  level: workflow.level,
                  approver_type: workflow.approver_type,
                  approver_id: workflow.approver_id,
                  enable_condition: workflow.enable_condition,
                  categoty_name_id: workflow.category_name || null,
                  status: workflow.status,
                };
              }),
            },
          },
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });
      return approver_process;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.approval_process()',
      );
      throw new InternalServerErrorException(
        `Error occurred while processing approval: ${error.message}`,
      );
    }
  }

  async verify_request(id: string, status: string, approval_id: string) {
    try {
      // Update the request form approval id and status
      const verify = await this.prismaService.requestionForm.update({
        where: { id },
        data: {
          isVerified: true,
          status: status,
          approval_id: approval_id,
        },
        include: {
          requester: {
            include: {
              departments: {
                include: {
                  department: {
                    include: {
                      manager: true,
                    },
                  },
                },
              },
            },
          },
          items: {
            include: {},
          },
          approval: {
            include: {
              user_approval: {
                include: {
                  approver: true,
                  item_category: true,
                },
              },
            },
          },
          requestForm_category: {
            include: {
              user_verifier: true,
            },
          },
          company: {
            include: {
              president: true,
              departments: true,
            },
          },
          department: {
            include: {
              manager: true,
            },
          },
          approval_process: {
            include: {
              approver: true,
              category_name: true,
              notes: true,
            },
          },
        },
      });
      // create the approval process
      await this.approval_process(id);
      // return the updated request
      return verify;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.verify_request()',
      );
      throw new InternalServerErrorException(
        `Error occurred while verifying request: ${error.message}`,
      );
    }
  }

  async update_request_status(
    approval_process_id: string,
    approval_process_status: APPROVAL_STATUS,
    request_form_id: string,
    request_form_status: string,
    updateRequestFormInput?: UpdateRequestFormInput,
    currentUser?: string,
  ) {
    try {
      const findRequest = await this.findOne(request_form_id);
      const findApprovalProcess =
        await this.findOneApprovalProcess(approval_process_id);
      const update_request_status =
        await this.prismaService.requestionForm.update({
          where: { id: findRequest.id },
          data: {
            status: request_form_status,
            approval_process: {
              update: {
                where: { id: approval_process_id },
                data: {
                  status: approval_process_status,
                  notes:
                    updateRequestFormInput.notes.length > 0
                      ? {
                          createMany: {
                            data: updateRequestFormInput.notes.map((note) => {
                              return {
                                name: `${approval_process_status} by ${currentUser}`,
                                description: note.description,
                                logs: `
                                  Status has been updated to ${approval_process_status} by ${currentUser} with the following note: ${note.description} for Process ID ${approval_process_id}.
                                `,
                              };
                            }),
                          },
                        }
                      : undefined,
                },
              },
            },
            notes:
              updateRequestFormInput.notes.length > 0
                ? {
                    createMany: {
                      data: updateRequestFormInput.notes.map((note) => {
                        return {
                          name: `${approval_process_status} by ${currentUser}`,
                          description: note.description,
                          logs: `
                      Status has been updated to ${approval_process_status} by ${currentUser} with the following note: ${note.description} for Process ID ${approval_process_id}.
                    `,
                        };
                      }),
                    },
                  }
                : undefined,
          },
          include: {
            requester: {
              include: {
                departments: {
                  include: {
                    department: {
                      include: {
                        manager: true,
                      },
                    },
                  },
                },
              },
            },
            items: {
              include: {},
            },
            approval: {
              include: {
                user_approval: {
                  include: {
                    approver: true,
                    item_category: true,
                  },
                },
              },
            },
            requestForm_category: {
              include: {
                user_verifier: true,
              },
            },
            company: {
              include: {
                president: true,
                departments: true,
              },
            },
            department: {
              include: {
                manager: true,
              },
            },
            approval_process: {
              include: {
                approver: true,
                category_name: true,
                notes: true,
              },
            },
          },
        });
      return update_request_status;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.update_request_status()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating request status: ${error.message}`,
      );
    }
  }

  async findOneApprovalProcess(id: string) {
    try {
      const approval_process =
        await this.prismaService.approvalProcess.findUnique({
          where: { id },
          include: {
            approver: true,
            category_name: true,
          },
        });
      return approval_process;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.findOneApprovalProcess()',
      );
      throw new InternalServerErrorException(
        `Error occurred while finding approval process: ${error.message}`,
      );
    }
  }

  async approve_request(
    approval_process_id: string,
    approval_process_status: APPROVAL_STATUS,
    request_form_status?: string | null,
    updateRequestFormInput?: UpdateRequestFormInput,
    currentUser?: string,
  ) {
    try {
      const findApprovalProcess =
        await this.findOneApprovalProcess(approval_process_id);

      if (!findApprovalProcess) {
        throw new BadRequestException('Approval process not found');
      }

      // Then get the count and all approval processes
      const [count, findAllApprovalProcess] = await Promise.all([
        this.prismaService.approvalProcess.count({
          where: { requestFormId: findApprovalProcess.requestFormId },
        }),
        this.prismaService.approvalProcess.findMany({
          where: { requestFormId: findApprovalProcess.requestFormId },
          select: {
            id: true,
            approver: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
          orderBy: { created_at: 'asc' },
        }),
      ]);

      const currentIndex = findAllApprovalProcess.findIndex(
        (process) => process.id === approval_process_id,
      );

      if (currentIndex === -1) {
        throw new BadRequestException(
          'Current approval process not found in sequence',
        );
      }

      const next_approver = findAllApprovalProcess[currentIndex + 1];
      const isLastApprover = currentIndex + 1 === count;
      const approverName = `${findApprovalProcess.approver.first_name} ${findApprovalProcess.approver.last_name}`;

      const last_approver = isLastApprover
        ? request_form_status || 'ON-GOING'
        : `${approval_process_status === 'APPROVED' ? 'APPROVED' : 'REJECTED'} by ${approverName}`;

      // Update current status
      const update_status = await this.update_request_status(
        approval_process_id,
        approval_process_status,
        findApprovalProcess.requestFormId,
        last_approver,
        updateRequestFormInput,
        currentUser,
      );

      // Only update next approver if exists
      if (next_approver) {
        await this.update_request_status(
          next_approver.id,
          APPROVAL_STATUS.PENDING,
          findApprovalProcess.requestFormId,
          last_approver,
          updateRequestFormInput,
          currentUser,
        );
      }

      return update_status;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.approve_request()',
      );
      throw new InternalServerErrorException(
        `Error occurred while approving request: ${error.message}`,
      );
    }
  }

  async reject_request(
    approval_process_id: string,
    status: APPROVAL_STATUS,
    updateRequestFormInput: UpdateRequestFormInput,
  ) {
    try {
      const findOne = await this.findOneApprovalProcess(approval_process_id);

      if (!findOne) {
        throw new BadRequestException('Approval process not found');
      }

      const findAllApprovalProcess =
        await this.prismaService.approvalProcess.findMany({
          where: {
            requestFormId: findOne.requestFormId,
          },
          include: {
            approver: true,
          },
        });

      const indexPosition = findAllApprovalProcess.findIndex(
        (index) => index.id === approval_process_id,
      );

      if (indexPosition === 0) {
        await this.update_status(
          findOne.requestFormId,
          `REJECTED BY ${findOne.approver.first_name} ${findOne.approver.last_name}`,
        );
        const update_approval_process =
          await this.prismaService.approvalProcess.update({
            where: { id: approval_process_id },
            data: {
              status,
              notes:
                updateRequestFormInput.notes.length > 0
                  ? {
                      createMany: {
                        data: updateRequestFormInput.notes.map((note) => {
                          return {
                            name: `REJECTED BY ${findOne.approver.first_name} ${findOne.approver.last_name}`,
                            description: note.description,
                            logs: `
                          Status has been updated to REJECTED by ${findOne.approver.first_name} ${findOne.approver.last_name} with the following note: ${note.description} for Process ID ${approval_process_id}.
                        `,
                          };
                        }),
                      },
                    }
                  : undefined,
            },
          });
        return update_approval_process;
      }

      const previous_approver = findAllApprovalProcess[indexPosition - 1];

      await this.prismaService.approvalProcess.update({
        where: { id: previous_approver.id },
        data: {
          status: APPROVAL_STATUS.PENDING,
        },
      });

      // Reject the current approval process
      const reject_approval_process = await this.update_request_status(
        approval_process_id,
        status,
        findOne.requestFormId,
        `REJECTED BY ${findOne.approver.first_name} ${findOne.approver.last_name}`,
        updateRequestFormInput,
      );

      return reject_approval_process;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestFormService.reject_request()',
      );
      throw new InternalServerErrorException(
        `Error occurred while rejecting request: ${error.message}`,
      );
    }
  }
}
