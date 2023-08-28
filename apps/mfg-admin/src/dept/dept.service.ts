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
      const result = await this.deptRepository.insertData(createDeptDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[dept/dept.service/createDept] createDept error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<Dept[]>> {
    try {
      const result = await this.deptRepository.findData();
      console.log(result);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[dept/dept.service/findDept] findDept error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataByDeptId(deptId: string): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.findDataByDeptId(deptId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[dept/dept.service/findDeptByDeptId] findDeptByDeptId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataByDeptId(
    deptId: string,
    updateDeptDto: UpdateDeptDto,
  ): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.updateDataByDeptId(deptId, updateDeptDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[dept/dept.service/updateDeptByDeptId] updateDeptByDeptId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataByDeptId(deptId: string): Promise<IApiResult<Dept>> {
    try {
      const result = await this.deptRepository.deleteDataByDeptId(deptId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[dept/dept.service/deleteDeptByDeptId] deleteDeptByDeptId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
