import { Injectable } from '@nestjs/common';

import { Manager } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { ManagerRepository } from './manager.repository';
import { CreateManagerDto, FindManagerDto, UpdateManagerDto } from './dto';

@Injectable()
export class ManagerService {
  constructor(
    private readonly managerRepository: ManagerRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createManagerDto: CreateManagerDto): Promise<Manager> {
    try {
      const result = await this.managerRepository.createData(createManagerDto);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<Manager[]> {
    try {
      const result = await this.managerRepository.findData();
      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<Manager> {
    try {
      const result = await this.managerRepository.findDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    try {
      const result = await this.managerRepository.updateDataById(id, updateManagerDto);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<Manager> {
    try {
      const result = await this.managerRepository.deleteDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  processingFindResult(data: Manager[]): FindManagerDto[] {
    const result: FindManagerDto[] = data.map((data: Manager) => {
      const { manager_id, name, email, created_at, updated_at, mgmtItem } = data;

      return {
        manager_id,
        name,
        email,
        created_at,
        updated_at,
        mgmt_item_id: mgmtItem.mgmt_item_id,
        mgmt_item_nm: mgmtItem.mgmt_item_nm,
      };
    });

    return result;
  }
}
