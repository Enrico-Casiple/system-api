import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly loggerService: LoggersService,
    private readonly userAccountService: UserAccountService,
    private readonly roleService: RoleService,
  ) {}
  async create(createDepartmentInput: CreateDepartmentInput) {
    try {
      const create_department = await this.prismaService.department.create({
        data: {
          name: createDepartmentInput.name,
          company_id: createDepartmentInput.company_id,
          manager_id: createDepartmentInput.manager_id,
          supervisor_id: createDepartmentInput.supervisor_id || undefined,
        },
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: {
            include: {
              user: true,
            },
          },
        },
      });

      return create_department;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.create()',
      );
      throw new InternalServerErrorException(
        `Error occurred while creating department: ${error.message}`,
      );
    }
  }

  async findAllByRolePermission(currentUserId: string) {
    try {
      return await this.findAll();
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching departments: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const departments = await this.prismaService.department.findMany({
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: true,
        },
      });

      return departments;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching all departments: ${error.message}`,
      );
    }
  }

  async findByUserDepartment(currentUserId: string) {
    const find_user_account =
      await this.userAccountService.findOne(currentUserId);
    try {
      const departments = await this.prismaService.department.findMany({
        where: {
          department_users: {
            some: {
              user_id: find_user_account.user_id,
            },
          },
        },
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: true,
        },
      });

      return departments;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.findByUserCompany()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching user departments: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const department = await this.prismaService.department.findUnique({
        where: {
          id,
        },
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!department) {
        this.loggerService.error(
          'Department not found',
          'DepartmentService.findOne()',
        );
        throw new InternalServerErrorException('Department not found');
      }

      return department;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching department findOne: ${error.message}`,
      );
    }
  }

  async update(id: string, updateDepartmentInput: UpdateDepartmentInput) {
    const existing_department = await this.findOne(id);

    try {
      const update_department = await this.prismaService.department.update({
        where: {
          id: existing_department.id,
        },
        data: {
          name: updateDepartmentInput.name,
          company_id: updateDepartmentInput.company_id,
          manager_id: updateDepartmentInput.manager_id,
          supervisor_id: updateDepartmentInput.supervisor_id || undefined,
        },
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: true,
        },
      });

      return update_department;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating department: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const department = await this.findOne(id);
      const delete_department = await this.prismaService.department.delete({
        where: {
          id: department.id,
        },
        include: {
          company: true,
          manager: true,
          supervisor: true,
          department_users: true,
        },
      });
      return delete_department;
    } catch (error) {
      this.loggerService.error(
        error.message,
        error.stack,
        'DepartmentService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while deleting department: ${error.message}`,
      );
    }
  }
}
