import { Injectable } from '@nestjs/common';

import { MgmtType } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { IApiResult } from '@app/interfaces';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { MgmtTypeRepository } from './mgmt-type.repository';
import { CreateMgmtTypeDto, UpdateMgmtTypeDto } from './dto';

@Injectable()
export class MgmtTypeService {
  constructor(
    private readonly mgmtTypeRepository: MgmtTypeRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtTypeDto: CreateMgmtTypeDto): Promise<IApiResult<MgmtType>> {
    try {
      const result = await this.mgmtTypeRepository.insertData(createMgmtTypeDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.service/createMgmtType] createMgmtType error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<MgmtType[]>> {
    try {
      const result = await this.mgmtTypeRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.service/findMgmtType] findMgmtType error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataByMgmtTypeId(mgmtTypeId: string): Promise<IApiResult<MgmtType>> {
    try {
      const result = await this.mgmtTypeRepository.findDataByMgmtTypeId(mgmtTypeId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.service/findMgmtTypeByMgmtTypeId] findMgmtTypeByMgmtTypeId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataByMgmtTypeId(
    mgmtTypeId: string,
    updateMgmtTypeDto: UpdateMgmtTypeDto,
  ): Promise<IApiResult<MgmtType>> {
    try {
      const result = await this.mgmtTypeRepository.updateDataByMgmtTypeId(
        mgmtTypeId,
        updateMgmtTypeDto,
      );
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.service/updateMgmtTypeByMgmtTypeId] updateMgmtTypeByMgmtTypeId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataByMgmtTypeId(mgmtTypeId: string): Promise<IApiResult<MgmtType>> {
    try {
      const result = await this.mgmtTypeRepository.deleteDataByMgmtTypeId(mgmtTypeId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.service/deleteMgmtTypeByMgmtTypeId] deleteMgmtTypeByMgmtTypeId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
