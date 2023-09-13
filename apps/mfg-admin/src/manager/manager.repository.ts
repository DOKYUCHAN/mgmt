import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Manager } from '@app/database';
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
      const { name, email, mgmt_item_id } = createManagerDto;

      const inserted = await this.managerRepo
        .createQueryBuilder()
        .insert()
        .into(Manager)
        .values({ name, email, mgmtItem: { mgmt_item_id } })
        .returning('*')
        .execute();

      const result = plainToInstance(Manager, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<Manager[]> {
    try {
      const result = await this.managerRepo
        .createQueryBuilder()
        .select()
        .innerJoinAndSelect(`Manager.mgmtItem`, 'MgmtItem')
        .getMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<Manager> {
    try {
      const result = await this.managerRepo
        .createQueryBuilder()
        .select()
        .innerJoinAndSelect(`Manager.mgmtItem`, 'MgmtItem')
        .where('"Manager"."manager_id" = :id', { id })
        .getOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    try {
      const { name, email } = updateManagerDto;

      const updated = await this.managerRepo
        .createQueryBuilder()
        .update()
        .set({ name, email })
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
