import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';
import { LoggersService } from 'src/common/log/log.service';

@Module({
  providers: [ItemResolver, ItemService, PrismaService, LoggersService],
})
export class ItemModule {}
