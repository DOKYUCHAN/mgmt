import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Dept } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError } from '@app/common/error';
import { getDBErrorCode } from '@app/utils';

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
      const { dept_nm } = createDeptDto;

      const inserted = await this.deptRepo
        .createQueryBuilder()
        .insert()
        .into(Dept)
        .values({ dept_nm })
        .returning('*')
        .execute();

      const result = plainToInstance(Dept, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findData(): Promise<Dept[]> {
    try {
      const result = await this.deptRepo.createQueryBuilder().select().getMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findDataById(id: string): Promise<Dept> {
    try {
      const result = await this.deptRepo
        .createQueryBuilder()
        .select()
        .where('"Dept"."dept_id" = :id', { id })
        .getOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async updateDataById(id: string, updateDeptDto: UpdateDeptDto): Promise<Dept> {
    try {
      const { dept_nm } = updateDeptDto;

      const updated = await this.deptRepo
        .createQueryBuilder()
        .update()
        .set({ dept_nm })
        .where('"Dept"."dept_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Dept, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
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
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }
}
