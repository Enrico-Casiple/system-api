import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserAccountInput } from './dto/create-user-account.input';
import { UpdateUserAccountInput } from './dto/update-user-account.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  create(createUserAccountInput: CreateUserAccountInput) {
    console.log(createUserAccountInput);
    return 'This action adds a new userAccount';
  }

  findAll() {
    return `This action returns all userAccount`;
  }

  async findOne(id: string) {
    try {
      const userAccount = await this.prismaService.user_Account.findUnique({
        where: { id },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
          user: {
            include: {
              companies: true,
              departments: true,
              company_president: true,
              department_manager: true,
            },
          },
        },
      });
      if (!userAccount) {
        this.logger.error(
          'User account not found',
          'UserAccountService.findOne()',
        );
        throw new InternalServerErrorException('User account not found');
      }
      return userAccount;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while finding user account: ${error.message}`,
      );
    }
  }

  update(id: string, updateUserAccountInput: UpdateUserAccountInput) {
    console.log(updateUserAccountInput);
    return `This action updates a #${id} userAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} userAccount`;
  }
}
