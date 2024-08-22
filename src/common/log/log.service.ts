import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class LoggersService extends ConsoleLogger {
  async log_file(entry: string) {
    const formatted_entry = `${new Date().toISOString()} \t ${entry} \n`;

    const log_path = path.join(__dirname, '../../../logs');
    const log_file = path.join(log_path, 'app.log');

    try {
      if (!fs.existsSync(log_path)) {
        fs.mkdirSync(log_path);
      }

      fs.appendFileSync(log_file, formatted_entry);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        this.error(`PrismaClientValidationError: ${error.message}`);
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        this.error(`PrismaClientKnownRequestError: ${error.message}`);
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        this.error(`PrismaClientUnknownRequestError: ${error.message}`);
      } else {
        this.error(`Unknown Error: ${error.message}`);
      }
    }
  }

  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const entry = `${context} - ${message}`;
    this.log_file(entry);
    super.log(message, context, ...rest);
  }

  error(
    message: unknown,
    trace?: string,
    context?: string,
    ...rest: unknown[]
  ): void {
    const entry = `${context} - ${message}`;
    this.log_file(entry);
    super.error(message, trace, context, ...rest);
  }
}
