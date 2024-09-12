import { Module } from '@nestjs/common';
import { RequestionFormCategoryService } from './requestion-form-category.service';
import { RequestionFormCategoryResolver } from './requestion-form-category.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [
    RequestionFormCategoryResolver,
    RequestionFormCategoryService,
    PrismaService,
    LoggersService,
  ],
})
export class RequestionFormCategoryModule {}
