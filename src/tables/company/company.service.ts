import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { RoleService } from '../role/role.service';
import { LoggersService } from 'src/common/log/log.service';
import { UserAccountService } from '../user-account/user-account.service';
import { VIEW_SCOPE } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggersService,
    private readonly roleService: RoleService,
    private readonly userAccountService: UserAccountService,
  ) {}
  async create(createCompanyInput: CreateCompanyInput, currentUserId: string) {
    const find_user_account =
      await this.userAccountService.findOne(currentUserId);

    await this.roleService.checkAddPermission(
      find_user_account.id,
      'COMPANY_MANAGEMENT',
    );
    try {
      const create_company = await this.prisma.company.create({
        data: {
          name: createCompanyInput.name,
          short_name: createCompanyInput.short_name,
          location: createCompanyInput.location,
          president_id: createCompanyInput.president_id,
          company_users: {
            create: createCompanyInput.company_users.map((user) => {
              return {
                user_id: user.user_id,
              };
            }),
          },
        },
        include: {
          president: true,
          company_users: {
            include: {
              user: true,
            },
          },
          departments: true,
        },
      });

      return create_company;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating company: ${error.message}`,
      );
    }
  }

  async findAllByRolePermission(currentUserId: string) {
    const checkView = await this.roleService.checkViewPermission(
      currentUserId,
      'COMPANY_MANAGEMENT',
    );
    const scope = checkView.map((view) => view.scope);
    try {
      switch (scope[0]) {
        case VIEW_SCOPE.ALL:
          return await this.findAll();
        case VIEW_SCOPE.COMPANY || VIEW_SCOPE.DEPARTMENT || VIEW_SCOPE.OWN:
          return await this.findByUserCompany(currentUserId);
        default:
          this.logger.error(
            `You have no permission`,
            'CompanyService.findAll()',
          );
          throw new InternalServerErrorException(`You have no permission`);
      }
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching companies: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const companies = await this.prisma.company.findMany({
        include: {
          president: true,
          departments: true,
          company_users: true,
        },
      });
      return companies;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching companies: ${error.message}`,
      );
    }
  }

  async findByUserCompany(currentUserId: string) {
    const find_user_account =
      await this.userAccountService.findOne(currentUserId);

    try {
      const companies = await this.prisma.company.findMany({
        where: {
          id: {
            in: find_user_account.user.companies.map(
              (company) => company.company_id,
            ),
          },
        },
        include: {
          president: true,
          departments: true,
          company_users: true,
        },
      });
      return companies;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching companies: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const company = await this.prisma.company.findUnique({
        where: {
          id: id,
        },
      });
      if (!company) {
        this.logger.error('Company not found', 'CompanyService.findOne()');
        throw new Error('Company not found');
      }
      return company;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.findOne()');
      throw new InternalServerErrorException(
        `Error occurred while fetching company: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateCompanyInput: UpdateCompanyInput,
    currentUserId: string,
  ) {
    const find_user_account =
      await this.userAccountService.findOne(currentUserId);
    await this.roleService.checkEditPermission(
      find_user_account.id,
      'COMPANY_MANAGEMENT',
    );
    try {
      await this.findOne(id);
      const updateCompany = await this.prisma.company.update({
        where: {
          id: id,
        },
        data: {
          name: updateCompanyInput.name,
          short_name: updateCompanyInput.short_name,
          location: updateCompanyInput.location,
          president_id: updateCompanyInput.president_id,
        },
      });
      return updateCompany;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating company: ${error.message}`,
      );
    }
  }

  async remove(id: string, currentUserId: string) {
    const find_user_account =
      await this.userAccountService.findOne(currentUserId);
    await this.roleService.checkDeletePermission(
      find_user_account.id,
      'COMPANY_MANAGEMENT',
    );
    try {
      await this.findOne(id);
      const deleteCompany = await this.prisma.company.delete({
        where: {
          id: id,
        },
      });
      return deleteCompany;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'CompanyService.remove()');
      throw new InternalServerErrorException(
        `Error occurred while deleting company: ${error.message}`,
      );
    }
  }
}
