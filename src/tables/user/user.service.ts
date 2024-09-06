import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { POSITION } from '@prisma/client';
import { UtilityService } from 'src/common/utility/utility.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
    private readonly utilityService: UtilityService,
  ) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const user_email = await this.findByEmail(createUserInput.email);

      if (user_email) {
        this.logger.error('User already exists', 'UserService.create()');
        throw new NotAcceptableException('User already exists');
      }

      const create_user = await this.prismaService.user.create({
        data: {
          first_name: createUserInput.first_name,
          middle_name: createUserInput.middle_name,
          last_name: createUserInput.last_name,
          email: createUserInput.email,
          phone_number: createUserInput.phone_number,
          position: createUserInput.position || POSITION.EMPLOYEE,
          companies:
            createUserInput.companies?.length > 0
              ? {
                  createMany: {
                    data: createUserInput.companies?.map((company) => {
                      return {
                        company_id: company.company_id,
                      };
                    }),
                  },
                }
              : undefined,
          departments:
            createUserInput.departments?.length > 0
              ? {
                  createMany: {
                    data: createUserInput.departments?.map((department) => {
                      return {
                        department_id: department.department_id,
                      };
                    }),
                  },
                }
              : undefined,
          user_account: {
            create: {
              email: createUserInput.email,
              username:
                createUserInput.user_account.username ||
                createUserInput.email.split('@')[0],
              password: await this.utilityService.hashPassword(
                createUserInput.user_account.password,
              ),
            },
          },
        },
        include: {
          user_account: true,
          companies: {
            include: {
              company: {
                include: {
                  president: true,
                },
              },
            },
          },
          departments: {
            include: {
              department: {
                include: {
                  company: true,
                  manager: true,
                  supervisor: true,
                  department_users: true,
                },
              },
            },
          },
          company_president: {
            include: {
              president: true,
            },
          },
          department_manager: {
            include: {
              manager: true,
              department_users: true,
            },
          },
        },
      });

      delete create_user.user_account.password;

      return create_user;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating user: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          user_account: true,
        },
      });

      if (!users) {
        this.logger.error('No users found', 'UserService.findAll()');
        throw new NotAcceptableException('No users found');
      }

      return users;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching users: ${error.message}`,
      );
    }
  }

  async findOne(email: string) {
    if (!email) {
      this.logger.error('Invalid id', 'UserService.findOne()');
      throw new NotAcceptableException('Invalid Email');
    }

    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          OR: [
            {
              email: email,
            },
            {
              user_account: {
                username: email,
              },
            },
          ],
        },
        include: {
          user_account: true,
          companies: true,
          departments: true,
        },
      });

      if (!user) {
        this.logger.error('User not found', 'UserService.findOne()');
        throw new NotAcceptableException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.findOne()');
      throw new InternalServerErrorException(
        `Error occurred while fetching user: ${error.message}`,
      );
    }
  }

  async findOneId(id: string) {
    if (!id) {
      this.logger.error('Invalid id', 'UserService.findOne()');
      throw new NotAcceptableException('Invalid Unique Indetifier');
    }

    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
        include: {
          user_account: true,
          companies: true,
          departments: true,
        },
      });

      if (!user) {
        this.logger.error('User not found', 'UserService.findOne()');
        throw new NotAcceptableException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.findOne()');
      throw new InternalServerErrorException(
        `Error occurred while fetching user: ${error.message}`,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        include: {
          user_account: true,
        },
      });

      return user;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserService.findByEmail()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching user: ${error.message}`,
      );
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      const user = await this.findOneId(id);
      if (!user) {
        this.logger.error('User not found', 'UserService.update()');
        throw new NotAcceptableException('User not found');
      }

      const existingCompanyInUser = user.companies.map((company) => {
        return {
          id: company.id,
        };
      });

      const existingDepartmentInUser = user.departments.map((department) => {
        return {
          id: department.id,
        };
      });

      const update_user = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          first_name: updateUserInput.first_name,
          middle_name: updateUserInput.middle_name,
          last_name: updateUserInput.last_name,
          email: updateUserInput.email,
          phone_number: updateUserInput.phone_number,
          position: updateUserInput.position,
          companies: {
            disconnect: existingCompanyInUser.map((company) => {
              return {
                id: company.id,
              };
            }),
            connect: updateUserInput.companies?.map((company) => {
              return {
                id: company.company_id,
              };
            }),
          },
          departments: {
            disconnect: existingDepartmentInUser.map((department) => {
              return {
                id: department.id,
              };
            }),
            connect: updateUserInput.departments?.map((department) => {
              return {
                id: department.department_id,
              };
            }),
          },
          user_account: {
            update: {
              email: updateUserInput.email,
              username:
                updateUserInput.user_account.username ||
                updateUserInput.email.split('@')[0],
            },
          },
        },
        include: {
          user_account: true,
        },
      });

      return update_user;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating user: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const user = await this.findOneId(id);
      if (!user) {
        this.logger.error('User not found', 'UserService.remove()');
        throw new NotAcceptableException('User not found');
      }

      const delete_user = await this.prismaService.user.delete({
        where: {
          id: id,
        },
        include: {
          user_account: true,
        },
      });

      return delete_user;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'UserService.remove()');
      throw new InternalServerErrorException(
        `Error occurred while deleting user: ${error.message}`,
      );
    }
  }
}
