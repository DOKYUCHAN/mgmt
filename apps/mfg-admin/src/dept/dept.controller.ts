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

import { DeptService } from './dept.service';
import { LoggerService } from '@app/common/logger';
import { CustomApiResponse } from '@app/decorators';
import { IApiResult } from '@app/interfaces';
import { DeptDto } from '@app/common/dto';
import { Dept } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { CreateDeptDto, UpdateDeptDto } from './dto';

@ApiTags('[부서] API')
@Controller('dept')
export class DeptController {
  constructor(private readonly deptService: DeptService, private readonly logger: LoggerService) {}

  //#region 🟩 생성
  @Post()
  @ApiOperation({ summary: '부서 생성', description: '부서정보를 생성합니다.' })
  @ApiBody({
    type: CreateDeptDto,
    isArray: false,
    description: '부서 생성 데이터',
  })
  @CustomApiResponse(DeptDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createDeptDto: CreateDeptDto) {
    try {
      const result: IApiResult<Dept> = await this.deptService.createData(createDeptDto);

      return result;
    } catch (err) {
      this.logger.error(err, `[dept/dept.controller/createData] createData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟦 조회
  @Get()
  @ApiOperation({
    summary: '부서 전체조회',
    description: '부서정보를 조회한다.',
  })
  @CustomApiResponse(DeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const result: IApiResult<Dept[]> = await this.deptService.findData();

      return result;
    } catch (err) {
      this.logger.error(err, `[dept/dept.controller/findData] findData error!`);
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 부서 조회(UUID)',
    description: 'UUID를 이용하여 특정 부서정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @CustomApiResponse(DeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) deptId: string) {
    try {
      const result: IApiResult<Dept> = await this.deptService.findDataByDeptId(deptId);

      return result;
    } catch (err) {
      this.logger.error(err, `[dept/dept.controller/findDataById] findDataById error!`);

      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟧 수정
  @Put('/:id')
  @ApiOperation({
    summary: '부서 수정',
    description: '특정 부서정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @ApiBody({
    type: UpdateDeptDto,
    isArray: false,
    description: '수정할 부서 데이터',
  })
  @CustomApiResponse(DeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateData(
    @Param('id', ParseUUIDPipe) deptId: string,
    @Body() updateDeptDto: UpdateDeptDto,
  ) {
    try {
      const result: IApiResult<Dept> = await this.deptService.updateDataByDeptId(
        deptId,
        updateDeptDto,
      );

      return result;
    } catch (err) {
      this.logger.error(err, `[dept/dept.controller/updateDataByDeptId] updateDataByDeptId error!`);

      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion

  //#region 🟥 삭제
  @Delete('/:id')
  @ApiOperation({
    summary: '부서 삭제',
    description: '특정 부서정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @CustomApiResponse(DeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteData(@Param('id', ParseUUIDPipe) deptId: string) {
    try {
      const result: IApiResult<Dept> = await this.deptService.deleteDataByDeptId(deptId);

      return result;
    } catch (err) {
      this.logger.error(err, `[dept/dept.controller/deleteData] deleteData error!`);

      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
