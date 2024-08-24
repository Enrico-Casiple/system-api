import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
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
          position: createUserInput.position,
          companies: {
            connect:
              createUserInput.company_id?.map((id) => {
                return { id: id };
              }) || [],
          },
          departments: {
            connect:
              createUserInput.department_id?.map((id) => {
                return { id: id };
              }) || [],
          },
          user_account: {
            create: {
              email: createUserInput.email,
              username: createUserInput.email.split('@')[0],
              password: createUserInput.user_account.password,
            },
          },
        },
        include: {
          user_account: true,
          companies: true,
          departments: true,
          company_president: true,
          department_manager: true,
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

  async findOne(id: string) {
    if (!id || id.length !== 23) {
      this.logger.error('Invalid id', 'UserService.findOne()');
      throw new NotAcceptableException('Invalid id');
    }

    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
        include: {
          user_account: true,
          companies: true,
          departments: true,
          company_president: true,
          department_manager: true,
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
      const user = await this.findOne(id);
      if (!user) {
        this.logger.error('User not found', 'UserService.update()');
        throw new NotAcceptableException('User not found');
      }
      const exsisting_company = await user.companies.find(
        (company) => company.id,
      );
      const exsisting_department = await user.departments.find(
        (department) => department.department_id,
      );

      const update_user = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          first_name: updateUserInput.first_name,
          middle_name: updateUserInput.middle_name,
          last_name: updateUserInput.last_name,
          email: updateUserInput.email,
          position: updateUserInput.position,
          companies: {
            disconnect: exsisting_company,
            connect: updateUserInput.company_id
              ? updateUserInput.company_id.map((id) => {
                  return { id: id };
                })
              : [],
          },
          departments: {
            disconnect: exsisting_department,
            connect: updateUserInput.department_id
              ? updateUserInput.department_id.map((id) => {
                  return { id: id };
                })
              : [],
          },
          user_account: {
            update: {
              email: updateUserInput.email,
              username: updateUserInput.email.split('@')[0],
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
      const user = await this.findOne(id);
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
