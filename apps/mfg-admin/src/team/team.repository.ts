import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Team } from '@app/database';
import { LoggerService } from '@app/common/logger';
import { CustomError } from '@app/common/error';
import { getDBErrorCode } from '@app/utils';

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
      const { team_nm, dept_id } = createTeamDto;

      const inserted = await this.teamRepo
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values({ team_nm, dept: { dept_id } })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, inserted.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findData(): Promise<Team[]> {
    try {
      const result = await this.teamRepo
        .createQueryBuilder()
        .select()
        .leftJoinAndSelect(`Team.dept`, 'Dept')
        .getMany();

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async findDataById(id: string): Promise<Team> {
    try {
      const result = await this.teamRepo
        .createQueryBuilder()
        .select()
        .leftJoinAndSelect(`Team.dept`, 'Dept')
        .where('"Team"."team_id" = :id', { id })
        .getOne();

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }

  async updateDataById(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    try {
      const { team_nm, dept_id } = updateTeamDto;

      const updated = await this.teamRepo
        .createQueryBuilder()
        .update()
        .set({ team_nm, dept: { dept_id } })
        .where('"Team"."team_id" = :id', { id })
        .returning('*')
        .execute();

      const result = plainToInstance(Team, updated.raw[0]);
      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
      throw new CustomError(getDBErrorCode(err), err.message);
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
      throw new CustomError(getDBErrorCode(err), err.message);
    }
  }
}
