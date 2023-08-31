import { Manager } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateManagerDto, UpdateManagerDto } from './dto';

@Injectable()
export class ManagerRepository {
  constructor(
    @Inject('MANAGER_REPO')
    private readonly managerRepo: Repository<Manager>,
    private readonly logger: LoggerService,
  ) {}

  async createData(createManagerDto: CreateManagerDto): Promise<Manager> {
    try {
      const inserted = await this.managerRepo
        .createQueryBuilder()
        .insert()
        .into(Manager)
        .values(createManagerDto)
        .returning('*')
        .execute();

      const result = plainToInstance(Manager, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<any[]> {
    try {
      const result = await this.managerRepo
        .createQueryBuilder()
        .select(
          `
          "Manager"."manager_id",
          "Manager"."mgmt_item_id",
          "MgmtItem"."mgmt_item_nm",
          "Manager"."name",
          "Manager"."email",
          "Manager"."created_at",
          "Manager"."updated_at",
          "Manager"."deleted_at"
          `,
        )
        .innerJoin(`Manager.mgmt_item_id`, 'MgmtItem')
        .getRawMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<any> {
    try {
      const result = await this.managerRepo
        .createQueryBuilder()
        .select(
          `
          "Manager"."manager_id",
          "Manager"."mgmt_item_id",
          "MgmtItem"."mgmt_item_nm",
          "Manager"."name",
          "Manager"."email",
          "Manager"."created_at",
          "Manager"."updated_at",
          "Manager"."deleted_at"
          `,
        )
        .innerJoin(`Manager.mgmt_item_id`, 'MgmtItem')
        .where('"Manager"."manager_id" = :id', { id })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    try {
      const updated = await this.managerRepo
        .createQueryBuilder()
        .update()
        .set(updateManagerDto)
        .where('"Manager"."manager_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Manager, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<Manager> {
    try {
      const deleted = await this.managerRepo
        .createQueryBuilder()
        .softDelete()
        .where('"Manager"."manager_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Manager, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
