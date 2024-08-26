import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { LoggersService } from 'src/common/log/log.service';

type Payload = {
  sub: string;
  id: string;
  email: string;
  role: Role[];
};

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly logger: LoggersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  // Adapt the request extraction for GraphQL
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async validate(request: Request, payload: Payload) {
    try {
      const refresh_token = request.headers.authorization.split(' ')[1];
      return {
        ...payload,
        refresh_token,
      };
    } catch (error) {
      this.logger.error(error.message, RefreshStrategy.name);
      throw new InternalServerErrorException(
        `${RefreshStrategy.name}: ${error.message}`,
      );
    }
  }
}
