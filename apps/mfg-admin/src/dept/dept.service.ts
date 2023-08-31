import { Injectable } from '@nestjs/common';

import { Dept } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { IApiResult } from '@app/interfaces';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { DeptRepository } from './dept.repository';
import { CreateDeptDto, UpdateDeptDto } from './dto';

@Injectable()
export class DeptService {
  constructor(
    private readonly deptRepository: DeptRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createDeptDto: CreateDeptDto): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.createData(createDeptDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<Dept[]>> {
    try {
      const result = await this.deptRepository.findData();
      console.log(result);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.findDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateDeptDto: UpdateDeptDto): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.updateDataById(id, updateDeptDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.deleteDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
