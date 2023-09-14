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
import { MgmtType } from '@app/database';
import { convertSaved } from '@app/utils';
import { CustomError, ERROR_CODE } from '@app/common/error';

import { MgmtTypeService } from './mgmt-type.service';
import {
  CreateMgmtTypeDto,
  FindMgmtTypeDto,
  SaveResultMgmtTypeDto,
  UpdateMgmtTypeDto,
} from './dto';

@ApiTags('[관리유형] API')
@Controller('mgmt-type')
export class MgmtTypeController {
  constructor(
    private readonly mgmtTypeService: MgmtTypeService,
    private readonly logger: LoggerService,
  ) {}

  //#region 🟩 생성
  @Post()
  @ApiOperation({
    summary: '관리유형 생성',
    description: '관리유형정보를 생성합니다.',
  })
  @ApiBody({
    type: CreateMgmtTypeDto,
    isArray: false,
    description: '관리유형 생성 데이터',
  })
  @CustomApiResponse(SaveResultMgmtTypeDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createMgmtTypeDto: CreateMgmtTypeDto) {
    try {
      const mgmtType: MgmtType = await this.mgmtTypeService.createData(createMgmtTypeDto);
      const result: IDataResult<SaveResultMgmtTypeDto> = convertSaved(mgmtType);

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
    summary: '관리유형 전체조회',
    description: '관리유형정보를 조회한다.',
  })
  @CustomApiResponse(FindMgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const mgmtTypes: MgmtType[] = await this.mgmtTypeService.findData();
      const result: IDataResult<FindMgmtTypeDto> = convertSaved(mgmtTypes);

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 관리유형 조회(UUID)',
    description: 'UUID를 이용하여 특정 관리유형정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리유형UUID' })
  @CustomApiResponse(FindMgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const mgmtType: MgmtType = await this.mgmtTypeService.findDataById(id);
      const result: IDataResult<FindMgmtTypeDto> = convertSaved(mgmtType);

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
    summary: '관리유형 수정',
    description: '특정 관리유형정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리유형UUID' })
  @ApiBody({
    type: UpdateMgmtTypeDto,
    isArray: false,
    description: '수정할 관리유형 데이터',
  })
  @CustomApiResponse(SaveResultMgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateDataById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMgmtTypeDto: UpdateMgmtTypeDto,
  ) {
    try {
      const mgmtType: MgmtType = await this.mgmtTypeService.updateDataById(id, updateMgmtTypeDto);
      const result: IDataResult<SaveResultMgmtTypeDto> = convertSaved(mgmtType);

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
    summary: '관리유형 삭제',
    description: '특정 관리유형정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리유형UUID' })
  @CustomApiResponse(SaveResultMgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const mgmtType: MgmtType = await this.mgmtTypeService.deleteDataById(id);
      const result: IDataResult<SaveResultMgmtTypeDto> = convertSaved(mgmtType);

      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
