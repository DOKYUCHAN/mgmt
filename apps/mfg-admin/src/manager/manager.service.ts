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
      const result = await this.managerRepository.insertData(createManagerDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[manager/manager.service/createManager] createManager error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.managerRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[manager/manager.service/findManager] findManager error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataByManagerId(managerId: string): Promise<IApiResult<any>> {
    try {
      const result = await this.managerRepository.findDataByManagerId(managerId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[manager/manager.service/findManagerByManagerId] findManagerByManagerId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataByManagerId(
    managerId: string,
    updateManagerDto: UpdateManagerDto,
  ): Promise<IApiResult<Manager>> {
    try {
      const result = await this.managerRepository.updateDataByManagerId(
        managerId,
        updateManagerDto,
      );
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[manager/manager.service/updateManagerByManagerId] updateManagerByManagerId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataByManagerId(managerId: string): Promise<IApiResult<Manager>> {
    try {
      const result = await this.managerRepository.deleteDataByManagerId(managerId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[manager/manager.service/deleteManagerByManagerId] deleteManagerByManagerId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
