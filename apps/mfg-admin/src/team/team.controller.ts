import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Put,
  Body,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';

import { TeamService } from './team.service';
import { LoggerService } from '@app/common/logger';
import { CustomApiResponse } from '@app/decorators';
import { IApiResult } from '@app/interfaces';
import { TeamDto } from '@app/common/dto';
import { Team } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateTeamDto, UpdateTeamDto } from './dto';

@ApiTags('[팀] API')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService, private readonly logger: LoggerService) {}

  //#region 🟩 생성
  @Post()
  @ApiOperation({ summary: '팀 생성', description: '팀정보를 생성합니다.' })
  @ApiBody({
    type: CreateTeamDto,
    isArray: false,
    description: '팀 생성 데이터',
  })
  @CustomApiResponse(TeamDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createTeamDto: CreateTeamDto) {
    try {
      const result: IApiResult<Team> = await this.teamService.createData(createTeamDto);

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.controller/createData] createData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟦 조회
  @Get()
  @ApiOperation({
    summary: '팀 전체조회',
    description: '팀정보를 조회한다.',
  })
  @CustomApiResponse(TeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const result: IApiResult<any[]> = await this.teamService.findData();

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.controller/findData] findData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 팀 조회(UUID)',
    description: 'UUID를 이용하여 특정 팀정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '팀UUID' })
  @CustomApiResponse(TeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) teamId: string) {
    try {
      const result: IApiResult<any> = await this.teamService.findDataByTeamId(teamId);

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.controller/findDataById] findDataById error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟧 수정
  @Put('/:id')
  @ApiOperation({
    summary: '팀 수정',
    description: '특정 팀정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '팀UUID' })
  @ApiBody({
    type: UpdateTeamDto,
    isArray: false,
    description: '수정할 팀 데이터',
  })
  @CustomApiResponse(TeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateData(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    try {
      const result: IApiResult<Team> = await this.teamService.updateDataByTeamId(
        teamId,
        updateTeamDto,
      );

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.controller/updateDataByTeamId] updateDataByTeamId error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟥 삭제
  @Delete('/:id')
  @ApiOperation({
    summary: '팀 삭제',
    description: '특정 팀정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '팀UUID' })
  @CustomApiResponse(TeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteData(@Param('id', ParseUUIDPipe) teamId: string) {
    try {
      const result: IApiResult<Team> = await this.teamService.deleteDataByTeamId(teamId);

      return result;
    } catch (err) {
      this.logger.error(err, `[team/team.controller/deleteData] deleteData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
