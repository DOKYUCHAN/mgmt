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
      const result = await this.teamRepository.insertData(createTeamDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[team/team.service/createTeam] createTeam error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<IApiResult<any[]>> {
    try {
      const result = await this.teamRepository.findData();
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[team/team.service/findTeam] findTeam error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataByTeamId(teamId: string): Promise<IApiResult<any>> {
    try {
      const result = await this.teamRepository.findDataByTeamId(teamId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[team/team.service/findTeamByTeamId] findTeamByTeamId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataByTeamId(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
  ): Promise<IApiResult<Team>> {
    try {
      const result = await this.teamRepository.updateDataByTeamId(teamId, updateTeamDto);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[team/team.service/updateTeamByTeamId] updateTeamByTeamId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataByTeamId(teamId: string): Promise<IApiResult<Team>> {
    try {
      const result = await this.teamRepository.deleteDataByTeamId(teamId);
      return convertSaved(result);
    } catch (err) {
      this.logger.error(err, `[team/team.service/deleteTeamByTeamId] deleteTeamByTeamId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
