import { Injectable } from '@nestjs/common';

import { Manager } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { IApiResult } from '@app/interfaces';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { ManagerRepository } from './manager.repository';
import { CreateManagerDto, UpdateManagerDto } from './dto';

@Injectable()
export class ManagerService {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createManagerDto: CreateManagerDto): Promise<IApiResult<Manager>> {
    try {
      const result = await this.managerRepository.createData(createManagerDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.managerRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<IApiResult<any>> {
    try {
      const result = await this.managerRepository.findDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(
    id: string,
    updateManagerDto: UpdateManagerDto,
  ): Promise<IApiResult<Manager>> {
    try {
      const result = await this.managerRepository.updateDataById(id, updateManagerDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<IApiResult<Manager>> {
    try {
      const result = await this.managerRepository.deleteDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
