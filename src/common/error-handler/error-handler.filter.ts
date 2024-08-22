import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import {
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { GraphQLResolveInfo } from 'graphql';
import { LoggersService } from '../log/log.service';

type MyResponseObj = {
  status_code: number;
  timestamp: string;
  path: string | number;
  response: string | object;
};

@Catch()
export class ErrorHandlerFilter<T>
  implements ExceptionFilter, GqlExceptionFilter
{
  private readonly logger = new LoggersService(ErrorHandlerFilter.name);

  catch(exception: T, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    const path = info?.path ? info.path.key : 'unknown';

    const response: MyResponseObj = {
      status_code: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      path,
      response: `The response are ok`,
    };

    if (exception instanceof Error) {
      response.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
      response.response = exception.message;
    } else if (exception instanceof HttpException) {
      response.status_code = exception.getStatus();
      response.response = exception.getResponse();
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      response.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
      response.response = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      response.status_code = HttpStatus.BAD_REQUEST;
      response.response = exception.message;
    } else {
      response.status_code = HttpStatus.INTERNAL_SERVER_ERROR;
      response.response = 'Unknown error';
    }

    const gqlContext = gqlHost.getContext();

    if (gqlContext && gqlContext.res) {
      gqlContext.res.status(response.status_code).json(response);
    }

    this.logger.log(
      `Error caught in ExceptionFilterFilter: ${response.response}`,
    );

    this.logger.error(
      `Error caught in ExceptionFilterFilter: ${response.response}`,
      ErrorHandlerFilter.name,
    );
  }
}
