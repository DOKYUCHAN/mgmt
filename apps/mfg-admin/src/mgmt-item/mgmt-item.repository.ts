import { MgmtItem } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

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

  async insertData(createMgmtItemDto: CreateMgmtItemDto): Promise<MgmtItem> {
    try {
      const inserted = await this.mgmtItemRepo
        .createQueryBuilder()
        .insert()
        .into(MgmtItem)
        .values(createMgmtItemDto)
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.repository/insertData] insertData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<any[]> {
    try {
      const result = await this.mgmtItemRepo
        .createQueryBuilder()
        .select(
          `
          "MgmtItem"."mgmt_item_id",
          "MgmtItem"."team_id",
          "Team"."team_nm",
          "MgmtItem"."mgmt_type_id",
          "MgmtType"."mgmt_type_nm",
          "MgmtItem"."partner",
          "MgmtItem"."mgmt_item_nm",
          "MgmtItem"."created_at",
          "MgmtItem"."updated_at",
          "MgmtItem"."deleted_at"
          `,
        )
        .innerJoin(`MgmtItem.team_id`, 'Team')
        .innerJoin(`MgmtItem.mgmt_type_id`, 'MgmtType')
        .getRawMany();

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.repository/findData] findData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataByMgmtItemId(mgmtItemId: string): Promise<any> {
    try {
      const result = await this.mgmtItemRepo
        .createQueryBuilder()
        .select(
          `
          "MgmtItem"."mgmt_item_id",
          "MgmtItem"."team_id",
          "Team"."team_nm",
          "MgmtItem"."mgmt_type_id",
          "MgmtType"."mgmt_type_nm",
          "MgmtItem"."partner",
          "MgmtItem"."mgmt_item_nm",
          "MgmtItem"."created_at",
          "MgmtItem"."updated_at",
          "MgmtItem"."deleted_at"
          `,
        )
        .innerJoin(`MgmtItem.team_id`, 'Team')
        .innerJoin(`MgmtItem.mgmt_type_id`, 'MgmtType')
        .where('"MgmtItem"."mgmt_item_id" = :mgmtItemId', { mgmtItemId })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.repository/findDataByMgmtItemId] findDataByMgmtItemId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataByMgmtItemId(
    mgmtItemId: string,
    updateMgmtItemDto: UpdateMgmtItemDto,
  ): Promise<MgmtItem> {
    try {
      const updated = await this.mgmtItemRepo
        .createQueryBuilder()
        .update()
        .set(updateMgmtItemDto)
        .where('"MgmtItem"."mgmt_item_id" = :mgmtItemId', { mgmtItemId })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.repository/updateDataByMgmtItemId] updateDataByMgmtItemId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataByMgmtItemId(mgmtItemId: string): Promise<MgmtItem> {
    try {
      const deleted = await this.mgmtItemRepo
        .createQueryBuilder()
        .softDelete()
        .where('"MgmtItem"."mgmt_item_id" = :mgmtItemId', { mgmtItemId })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtItem, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.repository/deleteDataByMgmtItemId] deleteDataByMgmtItemId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
