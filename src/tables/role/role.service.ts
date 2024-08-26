import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { MODULE, VIEW_SCOPE } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
    private readonly userAccountService: UserAccountService,
  ) {}
  async create(createRoleInput: CreateRoleInput, currentUserId: string) {
    await this.checkAddPermission(currentUserId, 'ROLE_MANAGEMENT');
    try {
      const role = await this.prismaService.role.create({
        data: {
          name: createRoleInput.name,
          permissions: {
            createMany: {
              data: createRoleInput.permissions.map((permission) => {
                return {
                  module: permission.module || MODULE.USER_MANAGEMENT,
                  view: permission.view || false,
                  add: permission.add || false,
                  edit: permission.edit || false,
                  delete: permission.delete || false,
                  verify: permission.verify || false,
                  scope: permission.scope || VIEW_SCOPE.OWN,
                };
              }),
            },
          },
          user_account: {
            connect: createRoleInput.user_account_id.map((id) => {
              return { id: id };
            }),
          },
        },
        include: {
          permissions: true,
          user_account: true,
        },
      });
      return role;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'RoleService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating role: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const roles = await this.prismaService.role.findMany({
        include: {
          permissions: true,
          user_account: true,
        },
      });
      return roles;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'RoleService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching users: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    if (!id || id.length !== 23) {
      this.logger.error('Invalid role id', 'RoleService.findOne()');
      throw new InternalServerErrorException('Invalid role id');
    }
    try {
      const role = await this.prismaService.role.findUnique({
        where: {
          id: id,
        },
        include: {
          permissions: true,
          user_account: true,
        },
      });

      if (!role) {
        this.logger.error('Role not found', 'RoleService.findOne()');
        throw new InternalServerErrorException('Role not found');
      }

      return role;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'RoleService.findOne()');
      throw new InternalServerErrorException(
        `Error occurred while fetching user: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateRoleInput: UpdateRoleInput,
    currentUserId: string,
  ) {
    await this.checkEditPermission(currentUserId, 'ROLE_MANAGEMENT');
    try {
      const existingRole = await this.findOne(id);
      const existingUserAccountIds = existingRole.user_account.map(
        (userAccount) => ({ id: userAccount.id }),
      );
      const role = await this.prismaService.role.update({
        where: {
          id: id,
        },
        data: {
          name: updateRoleInput.name,
          permissions: {
            createMany: {
              data: updateRoleInput.permissions.map((permission) => {
                return {
                  module: permission.module,
                  view: permission.view,
                  add: permission.add,
                  edit: permission.edit,
                  delete: permission.delete,
                  verify: permission.verify,
                  scope: permission.scope,
                };
              }),
            },
          },
          user_account: {
            disconnect: existingUserAccountIds,
            connect: updateRoleInput.user_account_id.map((newId) => {
              return { id: newId };
            }),
          },
        },
        include: {
          permissions: true,
          user_account: true,
        },
      });
      return role;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'RoleService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating role: ${error.message}`,
      );
    }
  }

  async remove(id: string, currentUserId: string) {
    await this.checkDeletePermission(currentUserId, 'ROLE_MANAGEMENT');
    try {
      const searchRole = await this.findOne(id);
      if (!searchRole) {
        this.logger.error('Role not found', 'RoleService.remove()');
        throw new InternalServerErrorException('Role not found');
      }
      const userAccountIds = searchRole.user_account.map((userAccount) => ({
        id: userAccount.id,
      }));
      await this.prismaService.role.update({
        where: {
          id: id,
        },
        data: {
          user_account: {
            disconnect: userAccountIds,
          },
        },
      });
      const deleteRole = await this.prismaService.role.delete({
        where: {
          id: id,
        },
      });
      return deleteRole;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'RoleService.remove()');
      throw new InternalServerErrorException(
        `Error occurred while deleting role: ${error.message}`,
      );
    }
  }

  async checkViewPermission(userId: string, module: MODULE) {
    const find_user_account = await this.userAccountService.findOne(userId);
    if (!find_user_account.role) {
      this.logger.error(
        'User has no role',
        'RoleService.checkViewPermission()',
      );
      throw new InternalServerErrorException('User has no role');
    }
    const permission = find_user_account.role.map((role) => {
      return role.permissions.find((permission) => {
        return permission.module === module && permission.view === true;
      });
    });
    if (!permission) {
      this.logger.error(
        'User has no view permission',
        'RoleService.checkViewPermission()',
      );
      throw new InternalServerErrorException('User has no view permission');
    }

    return permission;
  }

  async checkAddPermission(userId: string, module: MODULE) {
    try {
      const find_user_account = await this.userAccountService.findOne(userId);
      if (!find_user_account.role) {
        this.logger.error(
          'User has no role',
          'RoleService.checkAddPermission()',
        );
        throw new InternalServerErrorException('User has no role');
      }

      const permission = find_user_account.role.map((role) => {
        return role.permissions.find((permission) => {
          return permission.module === module && permission.add === true;
        });
      });

      if (!permission) {
        this.logger.error(
          'User has no add permission',
          'RoleService.checkAddPermission()',
        );
        throw new InternalServerErrorException('User has no add permission');
      }

      return permission;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RoleService.checkAddPermission()',
      );
      throw new InternalServerErrorException('User has no add permission');
    }
  }

  async checkEditPermission(userId: string, module: MODULE) {
    try {
      const find_user_account = await this.userAccountService.findOne(userId);
      if (!find_user_account.role) {
        this.logger.error(
          'User has no role',
          'RoleService.checkEditPermission()',
        );
        throw new InternalServerErrorException('User has no role');
      }

      const permission = find_user_account.role.map((role) => {
        return role.permissions.find((permission) => {
          return permission.module === module && permission.edit === true;
        });
      });

      if (!permission) {
        this.logger.error(
          'User has no edit permission',
          'RoleService.checkEditPermission()',
        );
        throw new InternalServerErrorException('User has no edit permission');
      }

      return permission;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RoleService.checkEditPermission()',
      );
      throw new InternalServerErrorException('User has no edit permission');
    }
  }

  async checkDeletePermission(userId: string, module: MODULE) {
    try {
      const find_user_account = await this.userAccountService.findOne(userId);
      if (!find_user_account.role) {
        this.logger.error(
          'User has no role',
          'RoleService.checkDeletePermission()',
        );
        throw new InternalServerErrorException('User has no role');
      }

      const permission = find_user_account.role.map((role) => {
        return role.permissions.find((permission) => {
          return permission.module === module && permission.delete === true;
        });
      });

      if (!permission) {
        this.logger.error(
          'User has no delete permission',
          'RoleService.checkDeletePermission()',
        );
        throw new InternalServerErrorException('User has no delete permission');
      }

      return permission;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RoleService.checkDeletePermission()',
      );
      throw new InternalServerErrorException('User has no delete permission');
    }
  }
}
