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
import { Dept } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { convertSaved } from '@app/utils';

import { DeptService } from './dept.service';
import { CreateDeptDto, UpdateDeptDto, FindDeptDto, SaveResultDeptDto } from './dto';

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
  @CustomApiResponse(SaveResultDeptDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createDeptDto: CreateDeptDto) {
    try {
      const dept: Dept = await this.deptService.createData(createDeptDto);
      const result: IDataResult<SaveResultDeptDto> = convertSaved(dept);

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
    summary: '부서 전체조회',
    description: '부서정보를 조회한다.',
  })
  @CustomApiResponse(FindDeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const depts: Dept[] = await this.deptService.findData();
      const result: IDataResult<FindDeptDto> = convertSaved(depts);

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 부서 조회(UUID)',
    description: 'UUID를 이용하여 특정 부서정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @CustomApiResponse(FindDeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const dept: Dept = await this.deptService.findDataById(id);
      const result: IDataResult<FindDeptDto> = convertSaved(dept);

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
    summary: '부서 수정',
    description: '특정 부서정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @ApiBody({
    type: UpdateDeptDto,
    isArray: false,
    description: '수정할 부서 데이터',
  })
  @CustomApiResponse(SaveResultDeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateDataById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDeptDto: UpdateDeptDto,
  ) {
    try {
      const dept: Dept = await this.deptService.updateDataById(id, updateDeptDto);
      const result: IDataResult<SaveResultDeptDto> = convertSaved(dept);

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
    summary: '부서 삭제',
    description: '특정 부서정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '부서UUID' })
  @CustomApiResponse(SaveResultDeptDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const dept: Dept = await this.deptService.deleteDataById(id);
      const result: IDataResult<SaveResultDeptDto> = convertSaved(dept);

      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
