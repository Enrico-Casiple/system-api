import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoggersService } from 'src/common/log/log.service';

@Injectable()
export class SupplierService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: LoggersService,
  ) {}

  /**
   * Creates a supplier
   *
   * @throws InternalServerErrorException if there is a server error
   * @returns Supplier
   */
  async create(createSupplierInput: CreateSupplierInput) {
    try {
      const create = await this.prismaService.supplier.create({
        data: {
          name: createSupplierInput.name,
          address: createSupplierInput.address,
          contact_person: createSupplierInput.contact_person,
          contact_number: createSupplierInput.contact_number,
          email: createSupplierInput.email,
        },
        include: {
          items: true,
        },
      });

      return create;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'SupplierService.create()');
      throw new InternalServerErrorException(
        `Error occurred while creating supplier: ${error.message}`,
      );
    }
  }

  /**
   * Retrieves all suppliers with their items
   *
   * @throws InternalServerErrorException
   * @returns Supplier[]
   */
  async findAll() {
    try {
      const suppliers = await this.prismaService.supplier.findMany({
        include: {
          items: true,
        },
      });
      return suppliers;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'SupplierService.findAll()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching suppliers: ${error.message}`,
      );
    }
  }

  /**
   * Retrieves a supplier by its id with their items
   *
   * @throws NotFoundException if supplier is not found
   * @throws InternalServerErrorException if there is a server error
   * @returns Supplier
   */
  async findOne(id: string) {
    if (!id) {
      this.logger.error('Invalid id', 'SupplierService.findOne()');
      throw new NotFoundException('SupplierService.findOne()');
    }
    try {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
        include: {
          items: true,
        },
      });

      if (!supplier) {
        this.logger.error('Supplier not found', 'SupplierService.findOne()');
        throw new NotFoundException('SupplierService.findOne()');
      }

      return supplier;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'SupplierService.findOne()',
      );
      throw new InternalServerErrorException(
        `Error occurred while fetching supplier: ${error.message}`,
      );
    }
  }

  /**
   * Updates a supplier
   *
   * @throws NotFoundException if supplier is not found
   * @throws InternalServerErrorException if there is a server error
   * @returns Supplier
   */
  async update(id: string, updateSupplierInput: UpdateSupplierInput) {
    try {
      await this.findOne(id);
      const update = await this.prismaService.supplier.update({
        where: { id },
        data: {
          name: updateSupplierInput.name,
          address: updateSupplierInput.address,
          contact_person: updateSupplierInput.contact_person,
          contact_number: updateSupplierInput.contact_number,
          email: updateSupplierInput.email,
        },
      });
      return update;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'SupplierService.update()');
      throw new InternalServerErrorException(
        `Error occurred while updating supplier: ${error.message}`,
      );
    }
  }

  /**
   * Removes a supplier
   *
   * @throws InternalServerErrorException if there is a server error
   * @throws NotFoundException if supplier is not found
   * @returns Supplier
   */
  async remove(id: string) {
    try {
      await this.findOne(id);
      const remove = await this.prismaService.supplier.delete({
        where: { id },
      });
      return remove;
    } catch (error) {
      this.logger.error(
        error.message,
        error.stack,
        'SupplierService.remove()', // Add the stack trace here
      );
      throw new InternalServerErrorException(
        `Error occurred while removing supplier: ${error.message}`,
      );
    }
  }
}
