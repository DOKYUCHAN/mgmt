import { Injectable } from '@nestjs/common';

import { MgmtType } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { MgmtTypeRepository } from './mgmt-type.repository';
import { CreateMgmtTypeDto, UpdateMgmtTypeDto } from './dto';

@Injectable()
export class MgmtTypeService {
  constructor(
    private readonly mgmtTypeRepository: MgmtTypeRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtTypeDto: CreateMgmtTypeDto): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepository.createData(createMgmtTypeDto);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<MgmtType[]> {
    try {
      const result = await this.mgmtTypeRepository.findData();
      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepository.findDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateMgmtTypeDto: UpdateMgmtTypeDto): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepository.updateDataById(id, updateMgmtTypeDto);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepository.deleteDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
