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
      const result = await this.mgmtItemRepository.insertData(createMgmtItemDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.service/createMgmtItem] createMgmtItem error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.mgmtItemRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.service/findMgmtItem] findMgmtItem error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataByMgmtItemId(mgmtItemId: string): Promise<IApiResult<any>> {
    try {
      const result = await this.mgmtItemRepository.findDataByMgmtItemId(mgmtItemId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.service/findMgmtItemByMgmtItemId] findMgmtItemByMgmtItemId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataByMgmtItemId(
    mgmtItemId: string,
    updateMgmtItemDto: UpdateMgmtItemDto,
  ): Promise<IApiResult<MgmtItem>> {
    try {
      const result = await this.mgmtItemRepository.updateDataByMgmtItemId(
        mgmtItemId,
        updateMgmtItemDto,
      );
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.service/updateMgmtItemByMgmtItemId] updateMgmtItemByMgmtItemId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataByMgmtItemId(mgmtItemId: string): Promise<IApiResult<MgmtItem>> {
    try {
      const result = await this.mgmtItemRepository.deleteDataByMgmtItemId(mgmtItemId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.service/deleteMgmtItemByMgmtItemId] deleteMgmtItemByMgmtItemId error!`,
      );
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
