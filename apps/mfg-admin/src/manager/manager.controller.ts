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

import { ManagerService } from './manager.service';
import { LoggerService } from '@app/common/logger';
import { CustomApiResponse } from '@app/decorators';
import { IApiResult } from '@app/interfaces';
import { ManagerDto } from '@app/common/dto';
import { Manager } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateManagerDto, UpdateManagerDto } from './dto';

@ApiTags('[담당자] API')
@Controller('manager')
export class ManagerController {
  constructor(
    private readonly mgmtItemService: ManagerService,
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
      const result: IApiResult<Manager> = await this.mgmtItemService.createData(createManagerDto);

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.controller/createData] createData error!`);
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
      const result: IApiResult<any[]> = await this.mgmtItemService.findData();

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.controller/findData] findData error!`);
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
  async findDataById(@Param('id', ParseUUIDPipe) mgmtItemId: string) {
    try {
      const result: IApiResult<any> = await this.mgmtItemService.findDataByManagerId(mgmtItemId);

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.controller/findDataById] findDataById error!`);
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
  async updateData(
    @Param('id', ParseUUIDPipe) mgmtItemId: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    try {
      const result: IApiResult<Manager> = await this.mgmtItemService.updateDataByManagerId(
        mgmtItemId,
        updateManagerDto,
      );

      return result;
    } catch (err) {
      this.logger.error(
        err,
        `[mgmtItem/mgmtItem.controller/updateDataByManagerId] updateDataByManagerId error!`,
      );
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
  async deleteData(@Param('id', ParseUUIDPipe) mgmtItemId: string) {
    try {
      const result: IApiResult<Manager> = await this.mgmtItemService.deleteDataByManagerId(
        mgmtItemId,
      );

      return result;
    } catch (err) {
      this.logger.error(err, `[mgmtItem/mgmtItem.controller/deleteData] deleteData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
