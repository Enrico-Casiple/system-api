import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import {
  Hidden_Info,
  UtilityService,
} from 'src/common/utility/utility.service';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { LoggersService } from 'src/common/log/log.service';
import { SendEmailService } from '../../common/send-email/send-email.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly loggersService: LoggersService,
    private readonly configService: ConfigService,
    private readonly utilityService: UtilityService,
    private readonly prismaService: PrismaService,
    private readonly sendEmailService: SendEmailService,
  ) {}
  create(createSessionInput: CreateSessionInput) {
    console.log('createSessionInput', createSessionInput);
    return 'This action adds a new session';
  }

  findAll() {
    return `This action returns all session`;
  }

  async findOne(id: string) {
    try {
      const session = await this.prismaService.session.findUnique({
        where: {
          id: id,
        },
        include: {
          user_account: {
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
                    },
                  },
                  department_manager: {
                    include: {
                      manager: true,
                      supervisor: true,
                    },
                  },
                },
              },
              role: {
                include: {
                  permissions: true,
                },
              },
              notes: true,
            },
          },
        },
      });

      if (!session) {
        this.loggersService.error(
          'Session not found',
          'SessionService.findOne()',
        );
        throw new BadRequestException('Session not found');
      }

      return session;
    } catch (error) {
      this.loggersService.error(error.message, error.stack, 'SessionService');
      throw new BadRequestException(
        `We have a problem in find session: ${error.message}`,
      );
    }
  }

  update(id: string, updateSessionInput: UpdateSessionInput) {
    console.log('updateSessionInput', updateSessionInput);
    return `This action updates a #${id} session`;
  }

  async remove(id: string) {
    try {
      const session = await this.prismaService.session.delete({
        where: {
          id: id,
        },
      });
      return session;
    } catch (error) {
      this.loggersService.error(error.message, error.stack, 'SessionService');
      throw new BadRequestException(
        `We have a problem in remove session: ${error.message}`,
      );
    }
  }

  async updateOrCreateSession(token_info: Hidden_Info) {
    try {
      const token =
        await this.utilityService.generateAccessTokenAndRefreshToken(
          token_info,
        );

      const sessions = await this.prismaService.session.upsert({
        where: {
          user_account_id: token_info.user_account_id,
        },
        create: {
          user_account_id: token_info.user_account_id,
          access_token: token.accessToken,
          refresh_token: token.refreshToken,
          expires_in: new Date(Date.now() + 10 * 60 * 1000),
          isLoggedOut: false,
        },
        update: {
          access_token: token.accessToken,
          refresh_token: token.refreshToken,
          expires_in: new Date(Date.now() + 10 * 60 * 1000),
        },
        include: {
          user_account: {
            include: {
              user: {
                include: {
                  companies: {
                    include: {
                      company: true,
                    },
                  },
                  departments: {
                    include: {},
                  },
                },
              },
              role: {
                include: {
                  permissions: true,
                },
              },
              notes: true,
            },
          },
        },
      });

      // if (sessions.user_account.user.emailVerified === null) {
      //   const emailInfo = {
      //     from: this.configService.get('EMAIL_SERVER_USER'),
      //     to: sessions.user_account.email,
      //     subject: 'Email verification',
      //     replyTo: this.configService.get('REPLY_TO'),
      //     token: token.accessToken,
      //     type: 'email-verify',
      //   };
      //   await this.sendEmailService.sendEmail(emailInfo);
      // }

      delete sessions.user_account.password;
      
      return sessions;
    } catch (error) {
      this.loggersService.error(
        `SessionService.updateOrCreateSession: ${error.message}`,
        error.stack,
        'SessionService.updateOrCreateSession',
      );
      throw new BadRequestException(
        `We have a problem in update or create session: ${error.message}`,
      );
    }
  }
}
