import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryResolver } from './item-category.resolver';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [
    ItemCategoryResolver,
    ItemCategoryService,
    PrismaService,
    LoggersService,
  ],
})
export class ItemCategoryModule {}
