import { Team } from '@app/database';
import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { LoggerService } from '@app/common/logger';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@Injectable()
export class TeamRepository {
  constructor(
    @Inject('TEAM_REPO')
    private readonly teamRepo: Repository<Team>,
    private readonly logger: LoggerService,
  ) {}

  async insertData(createTeamDto: CreateTeamDto): Promise<Team> {
    try {
      const inserted = await this.teamRepo
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values(createTeamDto)
        .returning('*')
        .execute();

      const result = plainToInstance(Team, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.repository/insertData] insertData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findData(): Promise<any[]> {
    try {
      const result = await this.teamRepo
        .createQueryBuilder()
        .select(
          `
          "Team"."team_id",
          "Team"."dept_id",
          "Dept"."dept_nm",
          "Team"."team_nm",
          "Team"."created_at",
          "Team"."updated_at",
          "Team"."deleted_at"
          `,
        )
        .leftJoin(`Team.dept_id`, 'Dept')
        .getRawMany();

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.repository/findData] findData error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataByTeamId(teamId: string): Promise<Team> {
    try {
      const result = await this.teamRepo
        .createQueryBuilder()
        .select(
          `
          "Team"."team_id",
          "Team"."dept_id",
          "Dept"."dept_nm",
          "Team"."team_nm",
          "Team"."created_at",
          "Team"."updated_at",
          "Team"."deleted_at"
          `,
        )
        .leftJoin(`Team.dept_id`, 'Dept')
        .where('"Team"."team_id" = :teamId', { teamId })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.repository/findDataByTeamId] findDataByTeamId error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataByTeamId(teamId: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const updated = await this.teamRepo
        .createQueryBuilder()
        .update()
        .set(updateTeamDto)
        .where('"Team"."team_id" = :teamId', { teamId })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.repository/updateDataByTeamId] updateDataByTeamId error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataByTeamId(teamId: string): Promise<Team> {
    try {
      const deleted = await this.teamRepo
        .createQueryBuilder()
        .softDelete()
        .where('"Team"."team_id" = :teamId', { teamId })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.repository/deleteDataByTeamId] deleteDataByTeamId error!`);
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
