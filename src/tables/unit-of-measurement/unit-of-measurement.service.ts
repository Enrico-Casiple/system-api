import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUnitOfMeasurementInput } from './dto/create-unit-of-measurement.input';
import { UpdateUnitOfMeasurementInput } from './dto/update-unit-of-measurement.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class UnitOfMeasurementService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}
  async create(createUnitOfMeasurementInput: CreateUnitOfMeasurementInput) {
    try {
      const create = await this.prismaService.unitOfMeasurement.create({
        data: {
          name: createUnitOfMeasurementInput.name,
          symbol: createUnitOfMeasurementInput.symbol,
          base_unit: createUnitOfMeasurementInput.base_unit,
          conversion_factor: createUnitOfMeasurementInput.conversion_factor,
          resutl_unit: createUnitOfMeasurementInput.resutl_unit,
        },
        include: {
          items: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UnitOfMeasurementService.create()',
      );
      throw new InternalServerErrorException(
        `Error occurred while creating unitOfMeasurement: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const unitOfMeasurements =
        await this.prismaService.unitOfMeasurement.findMany({
          include: {
            items: true,
          },
        });

      return unitOfMeasurements;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UnitOfMeasurementService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching unitOfMeasurements: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    if (!id) {
      this.logger.warn('UnitOfMeasurement Id must be provided');
      throw new InternalServerErrorException(
        'UnitOfMeasurement Id must be provided',
      );
    }
    try {
      const unitOfMeasurement =
        await this.prismaService.unitOfMeasurement.findUnique({
          where: { id },
          include: {
            items: true,
          },
        });

      if (!unitOfMeasurement) {
        this.logger.warn('UnitOfMeasurement not found');
        throw new InternalServerErrorException('UnitOfMeasurement not found');
      }

      return unitOfMeasurement;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UnitOfMeasurementService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching unitOfMeasurement: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    updateUnitOfMeasurementInput: UpdateUnitOfMeasurementInput,
  ) {
    try {
      await this.findOne(id);

      const update = await this.prismaService.unitOfMeasurement.update({
        where: { id },
        data: {
          name: updateUnitOfMeasurementInput.name,
          symbol: updateUnitOfMeasurementInput.symbol,
          base_unit: updateUnitOfMeasurementInput.base_unit,
          conversion_factor: updateUnitOfMeasurementInput.conversion_factor,
          resutl_unit: updateUnitOfMeasurementInput.resutl_unit,
        },
        include: {
          items: true,
        },
      });

      if (!update) {
        this.logger.warn('UnitOfMeasurement not found');
        throw new InternalServerErrorException('UnitOfMeasurement not found');
      }

      return update;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UnitOfMeasurementService.update()',
      );
      throw new InternalServerErrorException(
        `Error occurred while updating unitOfMeasurement: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.unitOfMeasurement.delete({
        where: { id },
      });

      if (!remove) {
        this.logger.warn('UnitOfMeasurement not found');
        throw new InternalServerErrorException('UnitOfMeasurement not found');
      }

      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'UnitOfMeasurementService.remove()',
      );
      throw new InternalServerErrorException(
        `Error occurred while removing unitOfMeasurement: ${error.message}`,
      );
    }
  }
}
