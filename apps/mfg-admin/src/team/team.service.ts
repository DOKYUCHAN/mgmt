import { Injectable } from '@nestjs/common';

import { Team } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { TeamRepository } from './team.repository';
import { CreateTeamDto, FindTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly logger: LoggerService,
  ) {}

  async createData(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      const result = await this.teamRepository.createData(createTeamDto);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findData(): Promise<Team[]> {
    try {
      const result = await this.teamRepository.findData();
      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<Team> {
    try {
      const result = await this.teamRepository.findDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const result = await this.teamRepository.updateDataById(id, updateTeamDto);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<Team> {
    try {
      const result = await this.teamRepository.deleteDataById(id);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  processingFindResult(data: Team[]): FindTeamDto[] {
    const result: FindTeamDto[] = data.map((data: Team) => {
      const { team_id, team_nm, created_at, updated_at, dept } = data;

      return {
        team_id,
        team_nm,
        created_at,
        updated_at,
        dept_id: dept?.dept_id ?? null,
        dept_nm: dept?.dept_nm ?? null,
      };
    });

    return result;
  }
}
