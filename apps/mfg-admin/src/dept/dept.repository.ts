import { Dept } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateDeptDto, UpdateDeptDto } from './dto';

@Injectable()
export class DeptRepository {
  constructor(
    @Inject('DEPT_REPO')
    private readonly deptRepo: Repository<Dept>,
    private readonly logger: LoggerService,
  ) {}

  async createData(createDeptDto: CreateDeptDto): Promise<Dept> {
    try {
      const inserted = await this.deptRepo
        .createQueryBuilder()
        .insert()
        .into(Dept)
        .values(createDeptDto)
        .returning('*')
        .execute();

      const result = plainToInstance(Dept, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<Dept[]> {
    try {
      const result = await this.deptRepo
        .createQueryBuilder()
        .select(
          `
          "Dept"."dept_id",
          "Dept"."dept_nm",
          "Dept"."created_at",
          "Dept"."updated_at",
          "Dept"."deleted_at"
          `,
        )
        .getRawMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<Dept> {
    try {
      const result = await this.deptRepo
        .createQueryBuilder()
        .select(
          `
          "Dept"."dept_id",
          "Dept"."dept_nm",
          "Dept"."created_at",
          "Dept"."updated_at",
          "Dept"."deleted_at"
          `,
        )
        .where('"Dept"."dept_id" = :id', { id })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateDeptDto: UpdateDeptDto): Promise<Dept> {
    try {
      const updated = await this.deptRepo
        .createQueryBuilder()
        .update()
        .set(updateDeptDto)
        .where('"Dept"."dept_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Dept, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<Dept> {
    try {
      const deleted = await this.deptRepo
        .createQueryBuilder()
        .softDelete()
        .where('"Dept"."dept_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Dept, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
