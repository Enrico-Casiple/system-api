import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ITEM_STATUS } from '@prisma/client';
import { LoggersService } from 'src/common/log/log.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';

@Injectable()
export class ItemService {
  constructor(
    private readonly primsaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createItemInput: CreateItemInput) {
    try {
      const item = await this.primsaService.item.create({
        data: {
          name: createItemInput.name,
          description: createItemInput.description,
          quantity: createItemInput.quantity || 1,
          unit_of_measurement_id: createItemInput.unit_of_measurement_id,
          item_category_id: createItemInput.item_category_id,
          item_status: createItemInput.item_status || 'PENDING',
        },
      });
      return item;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating item: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const items = await this.primsaService.item.findMany({
        include: {
          item_category: true,
          supplier: true,
          unit_of_measurement: true,
        },
      });
      return items;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching items: ${error.message}`,
      );
    }
  }

  async findallRequestItem(startData: Date, endData: Date) {
    try {
      const request_item = await this.primsaService.request_item.findMany({
        where: {
          created_at: {
            gte: startData,
            lte: endData,
          },
        },
        include: {
          requestion_forms: true,
        },
      });

      return request_item;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemService.findallRequestItem()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching items: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.primsaService.item.findUnique({
        where: {
          id: id,
        },
        include: {
          item_category: true,
          supplier: true,
          unit_of_measurement: true,
        },
      });
      return item;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.findOne()');
      throw new InternalServerErrorException(
        `Error occurred while fetching item: ${error.message}`,
      );
    }
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    try {
      const item = await this.primsaService.item.update({
        where: {
          id: id,
        },
        data: {
          name: updateItemInput.name,
          description: updateItemInput.description,
          quantity: updateItemInput.quantity || 1,
          unit_of_measurement_id: updateItemInput.unit_of_measurement_id,
          item_category_id: updateItemInput.item_category_id,
          item_status: updateItemInput.item_status,
        },
      });
      return item;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating item: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const item = await this.primsaService.item.delete({
        where: {
          id: id,
        },
      });
      return item;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.remove()');
      throw new InternalServerErrorException(
        `Error occurred while deleting item: ${error.message}`,
      );
    }
  }

  async item_status_update(id: string, item_status: ITEM_STATUS) {
    try {
      const findOne = await this.primsaService.request_item.findUnique({
        where: {
          id: id,
        },
      });

      if (!findOne) {
        throw new InternalServerErrorException('Item not found');
      }

      const item_update = await this.primsaService.request_item.update({
        where: {
          id: id,
        },
        data: {
          item_status: item_status,
        },
      });

      return item_update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemService.item_status_update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating item status: ${error.message}`,
      );
    }
  }
}
