import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ChangePasswordInput,
  LoginUserAccountInput,
} from './dto/create-user-account.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';
import {
  Hidden_Info,
  UtilityService,
} from 'src/common/utility/utility.service';
import { SessionService } from '../session/session.service';
import { SendEmailService } from '../../common/send-email/send-email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
    private readonly sessionService: SessionService,
    private readonly utilityService: UtilityService,
    private readonly sendEmailService: SendEmailService,
    private readonly configService: ConfigService,
  ) {}

  async findOne(id: string) {
    try {
      const userAccount = await this.prismaService.user_Account.findUnique({
        where: { id },
        include: {
          user: {
            include: {
              company_president: {
                include: {
                  president: true,
                  departments: {
                    include: {
                      manager: true,
                      supervisor: true,
                      department_users: {
                        include: {
                          user: true,
                        },
                      },
                    },
                  },
                  company_users: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
              companies: {
                include: {
                  user: true,
                },
              },
              departments: {
                include: {
                  user: true,
                },
              },
            },
          },
          role: {
            include: {
              permissions: true,
            },
          },
          sessions: true,
          notes: true,
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

  async findUserOne(id: string) {
    try {
      const userAccount = await this.prismaService.user_Account.findUnique({
        where: { user_id: id },
        include: {
          user: {
            include: {
              company_president: {
                include: {
                  president: true,
                  departments: {
                    include: {
                      manager: true,
                      supervisor: true,
                      department_users: {
                        include: {
                          user: true,
                        },
                      },
                    },
                  },
                  company_users: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
              companies: {
                include: {
                  user: true,
                },
              },
              departments: {
                include: {
                  user: true,
                },
              },
            },
          },
          role: {
            include: {
              permissions: true,
            },
          },
          sessions: true,
          notes: true,
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

  async login(loginUserAccountInput: LoginUserAccountInput) {
    try {
      const { user_account, password } = loginUserAccountInput;

      const userAccount = await this.prismaService.user_Account.findFirst({
        where: {
          OR: [
            {
              email: user_account,
            },
            {
              username: user_account,
            },
          ],
        },
        include: {
          user: {
            include: {
              companies: true,
              departments: true,
            },
          },
        },
      });

      if (!userAccount) {
        this.logger.error(
          'User account not found',
          'UserAccountService.login()',
        );
        throw new InternalServerErrorException('User account not found');
      }

      const isMatch = await this.utilityService.verifyPassword(
        userAccount.password,
        password,
      );

      if (!isMatch) {
        this.logger.error(
          'Password does not match',
          'UserAccountService.login()',
        );
        throw new InternalServerErrorException(
          'Email or password does not match',
        );
      }

      const token_info = {
        user_account_id: userAccount.id,
        user_id: userAccount.user_id,
        email: userAccount.email,
      };

      const session =
        await this.sessionService.updateOrCreateSession(token_info);

  

      return session;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.login()',
      );
      throw new InternalServerErrorException(
        `Error occurred while logging in: ${error.message}`,
      );
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = await this.utilityService.verifyAccessToken(token);
      // check if the token is expired
      if (payload.exp < Date.now() / 1000) {
        this.logger.error('Token expired', 'UserAccountService.verifyEmail()');
        throw new InternalServerErrorException(
          `You are not authorized to do this action. Please request a new email to verify email`,
        );
      }

      const find_user_account = await this.findOne(payload.user_account_id);

      if (find_user_account.user.emailVerified) {
        this.logger.error(
          'Email already verified',
          'UserAccountService.verifyEmail()',
        );
        throw new InternalServerErrorException(
          `You are not authorized to do this action. Please request a new email to verify email`,
        );
      }

      const userAccount = await this.prismaService.user_Account.update({
        where: {
          id: payload.user_account_id,
        },
        data: {
          user: {
            update: {
              emailVerified: new Date(Date.now()),
            },
          },
        },
      });

      return userAccount;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.verifyEmail()',
      );
      throw new InternalServerErrorException(
        `Error occurred while verifying email: ${error.message}`,
      );
    }
  }

  async resetPassword(email: string) {
    try {
      const userAccount = await this.prismaService.user_Account.findUnique({
        where: {
          email,
        },
      });

      if (!userAccount) {
        this.logger.error(
          'User account not found',
          'UserAccountService.resetPassword()',
        );
        throw new InternalServerErrorException('User account not found');
      }

      const reset_token = await this.utilityService.generateResetPasswordToken({
        user_account_id: userAccount.id,
        user_id: userAccount.user_id,
        email: userAccount.email,
      } as Hidden_Info);

      await this.sendEmailService.sendEmail({
        from: this.configService.get('EMAIL_SERVER_HOST'),
        to: userAccount.email,
        reply_to: this.configService.get('REPLY_TO'),
        subject: 'Reset Password',
        token: reset_token,
        type: 'change-password',
      });

      return `Reset password email sent to ${userAccount.email}`;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.resetPassword()',
      );
      throw new InternalServerErrorException(
        `Error occurred while resetting password: ${error.message}`,
      );
    }
  }

  async changePassword(
    changePasswordInput: ChangePasswordInput,
    reset_token: string,
  ) {
    try {
      if (
        changePasswordInput.password !== changePasswordInput.confirm_password
      ) {
        this.logger.error(
          'Password does not match',
          'UserAccountService.changePassword()',
        );
        throw new InternalServerErrorException('Password does not match');
      }

      const payload =
        await this.utilityService.verifyResetPasswordToken(reset_token);

      // check if the token is expired
      if (payload.exp < Date.now() / 1000) {
        this.logger.error(
          'Reset password token expired',
          'UserAccountService.changePassword()',
        );
        throw new InternalServerErrorException(
          `Please request a new email to reset password`,
        );
      }

      const userAccount = await this.prismaService.user_Account.update({
        where: {
          id: payload.user_account_id,
        },
        data: {
          password: await this.utilityService.hashPassword(
            changePasswordInput.password,
          ),
        },
      });
      return userAccount;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.changePassword()',
      );
      throw new InternalServerErrorException(
        `Error occurred while changing password: ${error.message}`,
      );
    }
  }

  async updateUserAccoutPassword(
    changePasswordInput: ChangePasswordInput,
    currentUserid: string,
  ) {
    try {
      const userAccount = await this.findOne(currentUserid);

      const isMatch = await this.utilityService.verifyPassword(
        userAccount.password,
        changePasswordInput.old_password,
      );

      if (!isMatch) {
        this.logger.error(
          'Password does not match',
          'UserAccountService.updateUserAccoutPassword()',
        );
        throw new InternalServerErrorException('Password does not match');
      }

      if (
        changePasswordInput.password !== changePasswordInput.confirm_password
      ) {
        this.logger.error(
          'Password does not match',
          'UserAccountService.updateUserAccoutPassword()',
        );
        throw new InternalServerErrorException('Password does not match');
      }

      const update_password = await this.prismaService.user_Account.update({
        where: {
          id: currentUserid,
        },
        data: {
          password: await this.utilityService.hashPassword(
            changePasswordInput.password,
          ),
        },
      });

      return update_password;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.updateUserAccoutPassword()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating user account password: ${error.message}`,
      );
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload =
        await this.utilityService.verifyRefreshToken(refresh_token);

      // check if the token is expired
      if (payload.exp < Date.now() / 1000) {
        this.logger.error(
          'Refresh token expired',
          'UserAccountService.refreshToken()',
        );
        throw new InternalServerErrorException(`Please login again`);
      }

      const session = await this.sessionService.updateOrCreateSession({
        user_account_id: payload.user_account_id,
        user_id: payload.user_id,
        email: payload.email,
      } as Hidden_Info);

      return session;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.refreshToken()',
      );
      throw new InternalServerErrorException(
        `Error occurred while refreshing token: ${error.message}`,
      );
    }
  }

  async logout(currentUserId: string) {
    try {
      const find_user_account = await this.findOne(currentUserId);

      if (!find_user_account.sessions) {
        this.logger.error(
          'User already logged out',
          'UserAccountService.logout()',
        );
        throw new InternalServerErrorException(`Please login again`);
      }

      const delete_session = await this.sessionService.remove(
        find_user_account.sessions.id,
      );

      return delete_session;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UserAccountService.logout()',
      );
      throw new InternalServerErrorException(
        `Error occurred while logging out: ${error.message}`,
      );
    }
  }
}
