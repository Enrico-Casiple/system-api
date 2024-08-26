import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { LoggersService } from 'src/common/log/log.service';
import { Hidden_Info } from 'src/common/utility/utility.service';
import { UserAccountService } from '../../../tables/user-account/user-account.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(
    private readonly loggersService: LoggersService,
    private readonly configService: ConfigService,
    private readonly userAccountService: UserAccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      passReqToCallback: true,
    });
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validate(request: Request, payload: Hidden_Info) {
    try {
      const { user_account_id } = payload;

      const access_token = request.headers.authorization.split(' ')[1];

      const user_account =
        await this.userAccountService.findOne(user_account_id);

      delete user_account.password;

      if (
        !user_account.sessions ||
        user_account.sessions.access_token !== access_token
      ) {
        this.loggersService.error(
          'Invalid access token',
          'AccessStrategy.validate',
        );
        throw new BadRequestException('Please try to login again');
      }

      return user_account;
    } catch (error) {
      this.loggersService.error(
        `AccessStrategy.validate: ${error.message}`,
        error.stack,
        'AccessStrategy.validate',
      );
      throw new BadRequestException(
        `We have a problem in validate access token: ${error.message}`,
      );
    }
  }
}
