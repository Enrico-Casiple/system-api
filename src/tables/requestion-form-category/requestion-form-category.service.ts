import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestionFormCategoryInput } from './dto/create-requestion-form-category.input';
import { UpdateRequestionFormCategoryInput } from './dto/update-requestion-form-category.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class RequestionFormCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  /**
   * Creates a new requestionFormCategory
   *
   * @param createRequestionFormCategoryInput The input for creating a requestionFormCategory
   * @returns The newly created requestionFormCategory
   * @throws InternalServerErrorException if there is a server error
   */
  async create(
    createRequestionFormCategoryInput: CreateRequestionFormCategoryInput,
  ) {
    try {
      const create = await this.prismaService.requestionFormCategory.create({
        data: {
          name: createRequestionFormCategoryInput.name,
          short_name: createRequestionFormCategoryInput.short_name,
          user_verifier_id: createRequestionFormCategoryInput.user_verifier_id,
        },
        include: {
          requestion_forms: true,
          user_verifier: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestionFormCategoryService.create()',
      );
      throw new InternalServerErrorException(
        `Error occurred while creating requestionFormCategory: ${error.message}`,
      );
    }
  }

  /**
   * Finds all requestionFormCategories.
   *
   * @returns All requestionFormCategories.
   * @throws InternalServerErrorException if there is a server error.
   */
  async findAll() {
    try {
      const requestionFormCategories =
        await this.prismaService.requestionFormCategory.findMany({
          include: {
            requestion_forms: true,
            user_verifier: true,
          },
        });
      return requestionFormCategories;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestionFormCategoryService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestionFormCategories: ${error.message}`,
      );
    }
  }

  /**
   * Finds a single requestionFormCategory by its id.
   *
   * @param id The id of the requestionFormCategory to find.
   * @throws NotFoundException if the requestionFormCategory is not found.
   * @throws InternalServerErrorException if there is a server error.
   * @returns The found requestionFormCategory.
   */
  async findOne(id: string) {
    if (!id) {
      this.logger.error(
        'RequestionFormCategoryService.findOne()',
        'id not found',
        'RequestionFormCategoryService',
      );
      throw new NotFoundException('RequestionFormCategoryService.findOne()');
    }
    try {
      const requestionFormCategory =
        await this.prismaService.requestionFormCategory.findUnique({
          where: {
            id,
          },
          include: {
            requestion_forms: true,
            user_verifier: true,
          },
        });

      if (!requestionFormCategory) {
        this.logger.error(
          'RequestionFormCategory not found',
          'RequestionFormCategoryService.findOne()',
          'RequestionFormCategoryService',
        );
        throw new NotFoundException('RequestionFormCategory not found');
      }
      return requestionFormCategory;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestionFormCategoryService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching requestionFormCategory: ${error.message}`,
      );
    }
  }

  /**
   * Updates a requestionFormCategory
   *
   * @throws InternalServerErrorException if there is a server error
   * @throws NotFoundException if requestionFormCategory is not found
   * @returns Updated requestionFormCategory
   */
  async update(
    id: string,
    updateRequestionFormCategoryInput: UpdateRequestionFormCategoryInput,
  ) {
    try {
      await this.findOne(id);
      const update = await this.prismaService.requestionFormCategory.update({
        where: { id },
        data: {
          name: updateRequestionFormCategoryInput.name,
          short_name: updateRequestionFormCategoryInput.short_name,
          user_verifier_id: updateRequestionFormCategoryInput.user_verifier_id,
        },
        include: {
          requestion_forms: true,
          user_verifier: true,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestionFormCategoryService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating requestionFormCategory: ${error.message}`,
      );
    }
  }

  /**
   * Removes a requestionFormCategory
   *
   * @throws InternalServerErrorException if there is a server error
   * @throws NotFoundException if requestionFormCategory is not found
   * @returns Removed requestionFormCategory
   */
  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.requestionFormCategory.delete({
        where: { id },
      });
      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'RequestionFormCategoryService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing requestionFormCategory: ${error.message}`,
      );
    }
  }
}
