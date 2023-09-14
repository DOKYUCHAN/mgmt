import { Injectable } from '@nestjs/common';

import { MgmtItem } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { MgmtItemRepository } from './mgmt-item.repository';
import { CreateMgmtItemDto, FindMgmtItemDto, UpdateMgmtItemDto } from './dto';

@Injectable()
export class MgmtItemService {
  constructor(
    private readonly mgmtItemRepository: MgmtItemRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtItemDto: CreateMgmtItemDto): Promise<MgmtItem> {
    try {
      const result = await this.mgmtItemRepository.createData(createMgmtItemDto);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<MgmtItem[]> {
    try {
      const result = await this.mgmtItemRepository.findData();
      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<MgmtItem> {
    try {
      const result = await this.mgmtItemRepository.findDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateMgmtItemDto: UpdateMgmtItemDto): Promise<MgmtItem> {
    try {
      const result = await this.mgmtItemRepository.updateDataById(id, updateMgmtItemDto);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<MgmtItem> {
    try {
      const result = await this.mgmtItemRepository.deleteDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  processingFindResult(data: MgmtItem[]): FindMgmtItemDto[] {
    const result: FindMgmtItemDto[] = data.map((data: MgmtItem) => {
      const { mgmt_item_id, mgmt_item_nm, partner, created_at, updated_at, team, mgmtType } = data;

      return {
        mgmt_item_id,
        mgmt_item_nm,
        partner,
        created_at,
        updated_at,
        team_id: team.team_id,
        team_nm: team.team_nm,
        mgmt_type_id: mgmtType.mgmt_type_id,
        mgmt_type_nm: mgmtType.mgmt_type_nm,
      };
    });

    return result;
  }
}
