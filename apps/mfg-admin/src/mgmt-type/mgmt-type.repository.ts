import { MgmtType } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateMgmtTypeDto, UpdateMgmtTypeDto } from './dto';

@Injectable()
export class MgmtTypeRepository {
  constructor(
    @Inject('MGMT_TYPE_REPO')
    private readonly mgmtTypeRepo: Repository<MgmtType>,
    private readonly logger: LoggerService,
  ) {}

  async insertData(createMgmtTypeDto: CreateMgmtTypeDto): Promise<MgmtType> {
    try {
      const inserted = await this.mgmtTypeRepo
        .createQueryBuilder()
        .insert()
        .into(MgmtType)
        .values(createMgmtTypeDto)
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.repository/insertData] insertData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<MgmtType[]> {
    try {
      const result = this.mgmtTypeRepo
        .createQueryBuilder()
        .select(
          `
          "MgmtType"."mgmt_type_id",
          "MgmtType"."mgmt_type_nm",
          "MgmtType"."created_at",
          "MgmtType"."updated_at",
          "MgmtType"."deleted_at"
          `,
        )
        .getRawMany();

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.repository/findData] findData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataByMgmtTypeId(mgmtTypeId: string): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepo
        .createQueryBuilder()
        .select(
          `
          "MgmtType"."mgmt_type_id",
          "MgmtType"."mgmt_type_nm",
          "MgmtType"."created_at",
          "MgmtType"."updated_at",
          "MgmtType"."deleted_at"
          `,
        )
        .where('"MgmtType"."mgmt_type_id" = :mgmtTypeId', { mgmtTypeId })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.repository/findDataByMgmtTypeId] findDataByMgmtTypeId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataByMgmtTypeId(
    mgmtTypeId: string,
    updateMgmtTypeDto: UpdateMgmtTypeDto,
  ): Promise<MgmtType> {
    try {
      const updated = await this.mgmtTypeRepo
        .createQueryBuilder()
        .update()
        .set(updateMgmtTypeDto)
        .where('"MgmtType"."mgmt_type_id" = :mgmtTypeId', { mgmtTypeId })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.repository/updateDataByMgmtTypeId] updateDataByMgmtTypeId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataByMgmtTypeId(mgmtTypeId: string): Promise<MgmtType> {
    try {
      const deleted = await this.mgmtTypeRepo
        .createQueryBuilder()
        .softDelete()
        .where('"MgmtType"."mgmt_type_id" = :mgmtTypeId', { mgmtTypeId })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.repository/deleteDataByMgmtTypeId] deleteDataByMgmtTypeId error!`,
      );
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
