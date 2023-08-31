import { Injectable } from '@nestjs/common';

import { Team } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { IApiResult } from '@app/interfaces';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { TeamRepository } from './team.repository';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createTeamDto: CreateTeamDto): Promise<IApiResult<Team>> {
    try {
      const result = await this.teamRepository.createData(createTeamDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.teamRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<IApiResult<any>> {
    try {
      const result = await this.teamRepository.findDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateTeamDto: UpdateTeamDto): Promise<IApiResult<Team>> {
    try {
      const result = await this.teamRepository.updateDataById(id, updateTeamDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<IApiResult<Team>> {
    try {
      const result = await this.teamRepository.deleteDataById(id);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
