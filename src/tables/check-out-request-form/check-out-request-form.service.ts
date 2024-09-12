import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCheckOutRequestFormInput } from './dto/create-check-out-request-form.input';
import { UpdateCheckOutRequestFormInput } from './dto/update-check-out-request-form.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class CheckOutRequestFormService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createCheckOutRequestFormInput: CreateCheckOutRequestFormInput) {
    try {
      const create = await this.prismaService.checkOutRequestForm.create({
        data: {
          requestion_forms_id:
            createCheckOutRequestFormInput.requestion_forms_id,
        },
        include: {
          requestion_forms: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'CheckOutRequestFormService.create()',
      );

      throw new InternalServerErrorException(
        `Error occurred while creating checkOutRequestForm: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const checkOutRequestForm =
        await this.prismaService.checkOutRequestForm.findMany({
          include: {
            requestion_forms: true,
          },
        });
      return checkOutRequestForm;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'CheckOutRequestFormService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching checkOutRequestForm: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        this.logger.error(
          'CheckOutRequestForm id is required',
          'CheckOutRequestFormService.findOne()',
        );
        throw new Error('CheckOutRequestForm id is required');
      }

      const checkOutRequestForm =
        await this.prismaService.checkOutRequestForm.findUnique({
          where: { id },
          include: {
            requestion_forms: true,
          },
        });

      if (!checkOutRequestForm) {
        this.logger.error(
          'CheckOutRequestForm not found',
          'CheckOutRequestFormService.findOne()',
        );
        throw new Error('CheckOutRequestForm not found');
      }

      return checkOutRequestForm;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'CheckOutRequestFormService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching checkOutRequestForm: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateCheckOutRequestFormInput: UpdateCheckOutRequestFormInput,
  ) {
    try {
      await this.findOne(id);

      const update = await this.prismaService.checkOutRequestForm.update({
        where: { id },
        data: {
          requestion_forms_id:
            updateCheckOutRequestFormInput.requestion_forms_id,
        },
        include: {
          requestion_forms: true,
        },
      });

      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'CheckOutRequestFormService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating checkOutRequestForm: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await Promise.all([
        await this.findOne(id),
        await this.prismaService.checkOutRequestForm.delete({
          where: { id },
        }),
      ]);
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'CheckOutRequestFormService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing checkOutRequestForm: ${error.message}`,
      );
    }
  }
}
