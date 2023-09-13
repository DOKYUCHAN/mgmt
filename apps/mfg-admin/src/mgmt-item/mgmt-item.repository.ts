import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { MgmtItem } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { CreateMgmtItemDto, UpdateMgmtItemDto } from './dto';

@Injectable()
export class MgmtItemRepository {
  constructor(
    @Inject('MGMT_ITEM_REPO')
    private readonly mgmtItemRepo: Repository<MgmtItem>,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtItemDto: CreateMgmtItemDto): Promise<MgmtItem> {
    try {
      const { mgmt_item_nm, partner, team_id, mgmt_type_id } = createMgmtItemDto;

      const inserted = await this.mgmtItemRepo
        .createQueryBuilder()
        .insert()
        .into(MgmtItem)
        .values({ mgmt_item_nm, partner, team: { team_id }, mgmtType: { mgmt_type_id } })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<MgmtItem[]> {
    try {
      const result = await this.mgmtItemRepo
        .createQueryBuilder()
        .select()
        .innerJoinAndSelect(`MgmtItem.team`, 'Team')
        .innerJoinAndSelect(`MgmtItem.mgmtType`, 'MgmtType')
        .getMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<MgmtItem> {
    try {
      const result = await this.mgmtItemRepo
        .createQueryBuilder()
        .select()
        .innerJoinAndSelect(`MgmtItem.team`, 'Team')
        .innerJoinAndSelect(`MgmtItem.mgmtType`, 'MgmtType')
        .where('"MgmtItem"."mgmt_item_id" = :id', { id })
        .getOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateMgmtItemDto: UpdateMgmtItemDto): Promise<MgmtItem> {
    try {
      const { mgmt_item_nm, partner, mgmt_type_id } = updateMgmtItemDto;

      const updated = await this.mgmtItemRepo
        .createQueryBuilder()
        .update()
        .set({ mgmt_item_nm, partner, mgmtType: { mgmt_type_id } })
        .where('"MgmtItem"."mgmt_item_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<MgmtItem> {
    try {
      const deleted = await this.mgmtItemRepo
        .createQueryBuilder()
        .softDelete()
        .where('"MgmtItem"."mgmt_item_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
