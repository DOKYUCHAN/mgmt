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

import { LoggerService } from '@app/common/logger';
import { CustomApiResponse } from '@app/decorators';
import { IDataResult } from '@app/interfaces';
import { Team } from '@app/database';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { TeamService } from './team.service';
import { CreateTeamDto, FindTeamDto, SaveResultTeamDto, UpdateTeamDto } from './dto';

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
  @CustomApiResponse(SaveResultTeamDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createTeamDto: CreateTeamDto) {
    try {
      const team: Team = await this.teamService.createData(createTeamDto);
      const result: IDataResult<SaveResultTeamDto> = convertSaved(team);

      return result;
    } catch (err) {
      this.logger.error(this.createData.name, err, 'createData error!');
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
  @CustomApiResponse(FindTeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const teams: Team[] = await this.teamService.findData();

      const findTeamDto: FindTeamDto[] = this.teamService.processingFindResult(teams);
      const result: IDataResult<FindTeamDto> = convertSaved(findTeamDto);

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 팀 조회(UUID)',
    description: 'UUID를 이용하여 특정 팀정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '팀UUID' })
  @CustomApiResponse(FindTeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const team: Team = await this.teamService.findDataById(id);

      const findTeamDto: FindTeamDto[] = this.teamService.processingFindResult([team]);
      const result: IDataResult<FindTeamDto> = convertSaved(findTeamDto);

      return result;
    } catch (err) {
      this.logger.error(this.findDataById.name, err, 'findDataById error!');
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
  @CustomApiResponse(SaveResultTeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateDataById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    try {
      const team: Team = await this.teamService.updateDataById(id, updateTeamDto);
      const result: IDataResult<SaveResultTeamDto> = convertSaved(team);

      return result;
    } catch (err) {
      this.logger.error(this.updateDataById.name, err, 'updateDataById error!');
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
  @CustomApiResponse(SaveResultTeamDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const team: Team = await this.teamService.deleteDataById(id);
      const result: IDataResult<SaveResultTeamDto> = convertSaved(team);

      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
