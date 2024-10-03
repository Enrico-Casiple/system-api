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
  create(createItemInput: CreateItemInput) {
    return 'This action adds a new item';
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

  update(id: string, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
