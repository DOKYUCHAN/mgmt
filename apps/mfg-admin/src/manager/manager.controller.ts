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
import { ManagerDto } from '@app/common/dto';
import { Manager } from '@app/database';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { ManagerService } from './manager.service';
import { CreateManagerDto, FindManagerDto, SaveResultManagerDto, UpdateManagerDto } from './dto';

@ApiTags('[담당자] API')
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly logger: LoggerService,
  ) {}

  //#region 🟩 생성
  @Post()
  @ApiOperation({
    summary: '담당자 생성',
    description: '담당자정보를 생성합니다.',
  })
  @ApiBody({
    type: CreateManagerDto,
    isArray: false,
    description: '담당자 생성 데이터',
  })
  @CustomApiResponse(ManagerDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createManagerDto: CreateManagerDto) {
    try {
      const manager: Manager = await this.managerService.createData(createManagerDto);
      const result: IDataResult<SaveResultManagerDto> = convertSaved(manager);

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
    summary: '담당자 전체조회',
    description: '담당자정보를 조회한다.',
  })
  @CustomApiResponse(ManagerDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const managers: Manager[] = await this.managerService.findData();

      const findManagerDto: FindManagerDto[] = this.managerService.processingFindResult(managers);
      const result: IDataResult<FindManagerDto> = convertSaved(findManagerDto);

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 담당자 조회(UUID)',
    description: 'UUID를 이용하여 특정 담당자정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '담당자UUID' })
  @CustomApiResponse(ManagerDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const manager: Manager = await this.managerService.findDataById(id);

      const findManagerDto: FindManagerDto[] = this.managerService.processingFindResult([manager]);
      const result: IDataResult<FindManagerDto> = convertSaved(findManagerDto);

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
    summary: '담당자 수정',
    description: '특정 담당자정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '담당자UUID' })
  @ApiBody({
    type: UpdateManagerDto,
    isArray: false,
    description: '수정할 담당자 데이터',
  })
  @CustomApiResponse(ManagerDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateDataById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    try {
      const manager: Manager = await this.managerService.updateDataById(id, updateManagerDto);
      const result: IDataResult<SaveResultManagerDto> = convertSaved(manager);

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
    summary: '담당자 삭제',
    description: '특정 담당자정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '담당자UUID' })
  @CustomApiResponse(ManagerDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const manager: Manager = await this.managerService.deleteDataById(id);
      const result: IDataResult<SaveResultManagerDto> = convertSaved(manager);

      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
