import { Injectable } from '@nestjs/common';
import { CreateUnitOfMeasurementInput } from './dto/create-unit-of-measurement.input';
import { UpdateUnitOfMeasurementInput } from './dto/update-unit-of-measurement.input';

@Injectable()
export class UnitOfMeasurementService {
  create(createUnitOfMeasurementInput: CreateUnitOfMeasurementInput) {
    return 'This action adds a new unitOfMeasurement';
  }

  findAll() {
    return `This action returns all unitOfMeasurement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unitOfMeasurement`;
  }

  update(id: number, updateUnitOfMeasurementInput: UpdateUnitOfMeasurementInput) {
    return `This action updates a #${id} unitOfMeasurement`;
  }

  remove(id: number) {
    return `This action removes a #${id} unitOfMeasurement`;
  }
}
