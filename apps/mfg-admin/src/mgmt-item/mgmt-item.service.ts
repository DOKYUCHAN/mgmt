import { Injectable } from '@nestjs/common';

import { MgmtItem } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { IApiResult } from '@app/interfaces';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { MgmtItemRepository } from './mgmt-item.repository';
import { CreateMgmtItemDto, UpdateMgmtItemDto } from './dto';

@Injectable()
export class MgmtItemService {
  constructor(
    private readonly mgmtItemRepository: MgmtItemRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtItemDto: CreateMgmtItemDto): Promise<IApiResult<MgmtItem>> {
    try {
      const result = await this.mgmtItemRepository.createData(createMgmtItemDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.mgmtItemRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<IApiResult<any>> {
    try {
      const result = await this.mgmtItemRepository.findDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(
    id: string,
    updateMgmtItemDto: UpdateMgmtItemDto,
  ): Promise<IApiResult<MgmtItem>> {
    try {
      const result = await this.mgmtItemRepository.updateDataById(id, updateMgmtItemDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<IApiResult<MgmtItem>> {
    try {
      const result = await this.mgmtItemRepository.deleteDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
