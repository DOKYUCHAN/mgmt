import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { MgmtType } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError } from '@app/common/error';
import { getDBErrorCode } from '@app/utils';

import { CreateMgmtTypeDto, UpdateMgmtTypeDto } from './dto';

@Injectable()
export class MgmtTypeRepository {
  constructor(
    @Inject('MGMT_TYPE_REPO')
    private readonly mgmtTypeRepo: Repository<MgmtType>,
    private readonly logger: LoggerService,
  ) {}

  async createData(createMgmtTypeDto: CreateMgmtTypeDto): Promise<MgmtType> {
    try {
      const { mgmt_type_nm } = createMgmtTypeDto;

      const inserted = await this.mgmtTypeRepo
        .createQueryBuilder()
        .insert()
        .into(MgmtType)
        .values({ mgmt_type_nm })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findData(): Promise<MgmtType[]> {
    try {
      const result = this.mgmtTypeRepo.createQueryBuilder().select().getMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findDataById(id: string): Promise<MgmtType> {
    try {
      const result = await this.mgmtTypeRepo
        .createQueryBuilder()
        .select()
        .where('"MgmtType"."mgmt_type_id" = :id', { id })
        .getOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async updateDataById(id: string, updateMgmtTypeDto: UpdateMgmtTypeDto): Promise<MgmtType> {
    try {
      const { mgmt_type_nm } = updateMgmtTypeDto;

      const updated = await this.mgmtTypeRepo
        .createQueryBuilder()
        .update()
        .set({ mgmt_type_nm })
        .where('"MgmtType"."mgmt_type_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async deleteDataById(id: string): Promise<MgmtType> {
    try {
      const deleted = await this.mgmtTypeRepo
        .createQueryBuilder()
        .softDelete()
        .where('"MgmtType"."mgmt_type_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(MgmtType, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }
}
