import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

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
          ...createItemInput,
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
        }
      });
      return items;
      
    } catch (error) {
      this.logger.error(error.message, error.stack, 'ItemService.findAll()');
      throw new InternalServerErrorException(
        `Error occurred while fetching items: ${error.message}`,
      );
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} item`;
  }

  async update(id: string, updateItemInput: UpdateItemInput) {
    try {
      const item = await this.primsaService.item.update({
        where: {
          id: id,
        },
        data: {
          ...updateItemInput,
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

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
