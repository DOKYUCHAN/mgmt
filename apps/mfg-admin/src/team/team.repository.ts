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

  async createData(createTeamDto: CreateTeamDto): Promise<Team> {
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
      this.logger.error(this.createData.name, err, 'createData error!');
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
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async findDataById(id: string): Promise<Team> {
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
        .where('"Team"."team_id" = :id', { id })
        .getRawOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async updateDataById(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const updated = await this.teamRepo
        .createQueryBuilder()
        .update()
        .set(updateTeamDto)
        .where('"Team"."team_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }

  async deleteDataById(id: string): Promise<Team> {
    try {
      const deleted = await this.teamRepo
        .createQueryBuilder()
        .softDelete()
        .where('"Team"."team_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, deleted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(ERROR_CODE.DB_ERROR, err.message);
    }
  }
}
