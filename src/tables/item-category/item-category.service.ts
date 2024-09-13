import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateItemCategoryInput } from './dto/create-item-category.input';
import { UpdateItemCategoryInput } from './dto/update-item-category.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class ItemCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createItemCategoryInput: CreateItemCategoryInput) {
    try {
      const create = await this.prismaService.itemCategory.create({
        data: {
          name: createItemCategoryInput.name,
          description: createItemCategoryInput.description,
          user_approval_id: createItemCategoryInput.user_approval_id,
        },
        include: {
          user_approval: true,
          approvalUser: true,
          items: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemCategoryService.create()',
      );
      throw new InternalServerErrorException(
        `Error occurred while creating itemCategory: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const itemCategories = await this.prismaService.itemCategory.findMany({
        include: {
          approvalUser: true,
          items: true,
          user_approval: true,
        },
      });
      return itemCategories;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemCategoryService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching itemCategories: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    // Check if the id Is MongoObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      this.logger.error('Invalid id', 'ItemCategoryService.findOne()');
      throw new Error('Invalid id');
    }

    try {
      const itemCategory = await this.prismaService.itemCategory.findUnique({
        where: { id },
        include: {
          approvalUser: true,
          items: true,
          user_approval: true,
        },
      });

      if (!itemCategory) {
        this.logger.error(
          'ItemCategory not found',
          'ItemCategoryService.findOne()',
        );
        throw new Error('ItemCategory not found');
      }

      return itemCategory;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemCategoryService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching itemCategory: ${error.message}`,
      );
    }
  }

  async update(id: string, updateItemCategoryInput: UpdateItemCategoryInput) {
    try {
      await this.findOne(id);
      const update = await this.prismaService.itemCategory.update({
        where: { id },
        data: {
          name: updateItemCategoryInput.name,
          description: updateItemCategoryInput.description,
          user_approval_id: updateItemCategoryInput.user_approval_id,
        },
        include: {
          approvalUser: true,
          items: true,
          user_approval: true,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemCategoryService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating itemCategory: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.itemCategory.delete({
        where: { id },
      });

      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'ItemCategoryService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing itemCategory: ${error.message}`,
      );
    }
  }
}
