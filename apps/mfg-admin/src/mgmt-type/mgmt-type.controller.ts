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

import { MgmtTypeService } from './mgmt-type.service';
import { LoggerService } from '@app/common/logger';
import { CustomApiResponse } from '@app/decorators';
import { IApiResult } from '@app/interfaces';
import { MgmtTypeDto } from '@app/common/dto';
import { MgmtType } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateMgmtTypeDto, UpdateMgmtTypeDto } from './dto';

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
  @CustomApiResponse(MgmtTypeDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createMgmtTypeDto: CreateMgmtTypeDto) {
    try {
      const result: IApiResult<MgmtType> = await this.mgmtTypeService.createData(createMgmtTypeDto);

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.controller/createData] createData error!`);
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
  @CustomApiResponse(MgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const result: IApiResult<MgmtType[]> = await this.mgmtTypeService.findData();

      console.log(result);
      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.controller/findData] findData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 관리유형 조회(UUID)',
    description: 'UUID를 이용하여 특정 관리유형정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리유형UUID' })
  @CustomApiResponse(MgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) mgmtTypeId: string) {
    try {
      const result: IApiResult<MgmtType> = await this.mgmtTypeService.findDataByMgmtTypeId(
        mgmtTypeId,
      );

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.controller/findDataById] findDataById error!`);
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
  @CustomApiResponse(MgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateData(
    @Param('id', ParseUUIDPipe) mgmtTypeId: string,
    @Body() updateMgmtTypeDto: UpdateMgmtTypeDto,
  ) {
    try {
      const result: IApiResult<MgmtType> = await this.mgmtTypeService.updateDataByMgmtTypeId(
        mgmtTypeId,
        updateMgmtTypeDto,
      );

      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtType/mgmtType.controller/updateDataByMgmtTypeId] updateDataByMgmtTypeId error!`,
      );
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
  @CustomApiResponse(MgmtTypeDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteData(@Param('id', ParseUUIDPipe) mgmtTypeId: string) {
    try {
      const result: IApiResult<MgmtType> = await this.mgmtTypeService.deleteDataByMgmtTypeId(
        mgmtTypeId,
      );

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtType/mgmtType.controller/deleteData] deleteData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
