import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

type CounterType = {
  [key: string]: string;
};

type Counter_Entity = 'PURCHASE_NUMBER';

@Injectable()
export class CounterService {
  private readonly logger = new Logger(CounterService.name);
  private readonly MAX_RETRIES = 25;
  private readonly BASE_DELAY = 100;

  constructor(private readonly prisma: PrismaService) {}

  counter_map: CounterType = {
    PURCHASE_NUMBER: 'PR',
  };

  async getCounter(entity_model: Counter_Entity): Promise<string> {
    const entity = this.counter_map[entity_model];
    if (!entity) throw new Error('Entity not found');

    const dateKey = this.getCurrentDateKey();

    for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
      try {
        return await this.handleCounter(entity_model, entity, dateKey);
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2034'
        ) {
          const delay = Math.pow(2, attempt) * this.BASE_DELAY;
          this.logger.warn(
            `Attempt ${attempt} failed. Retrying in ${delay}ms...`,
          );
          await new Promise((res) => setTimeout(res, delay));
        } else {
          this.logger.error('Error getting counter', error.stack);
          throw error;
        }
      }
    }
    throw new Error('Failed to get counter after multiple attempts');
  }

  private getCurrentDateKey(): string {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .slice(0, 10);
  }

  private async handleCounter(
    entity_model: Counter_Entity,
    entity: string,
    dateKey: string,
  ): Promise<string> {
    let counter = await this.prisma.counter_Store.findFirst({
      where: { entity: entity_model },
      orderBy: { increment_id: 'desc' },
      take: 1,
    });

    if (!counter) {
      counter = await this.prisma.counter_Store.create({
        data: {
          entity: entity_model,
          increment_id: 1,
          dateToCreate: dateKey,
        },
      });
    } else if (counter.dateToCreate !== dateKey) {
      counter = await this.prisma.counter_Store.update({
        where: { id: counter.id },
        data: {
          increment_id: 1,
          dateToCreate: dateKey,
        },
      });
    } else {
      counter = await this.prisma.counter_Store.update({
        where: { id: counter.id },
        data: { increment_id: { increment: 1 } },
      });
    }

    return this.formatCounter(entity, dateKey, counter.increment_id);
  }

  private formatCounter(
    entity: string,
    dateKey: string,
    incrementId: number,
  ): string {
    return `${entity}-${dateKey.replace(/-/g, '')}-${String(incrementId).padStart(4, '0')}`;
  }
}
