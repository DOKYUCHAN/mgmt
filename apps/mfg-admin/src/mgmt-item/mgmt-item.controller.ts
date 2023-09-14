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
import { MgmtItem } from '@app/database';
import { CustomError, ERROR_CODE } from '@app/common/error';
import { convertSaved } from '@app/utils';

import { MgmtItemService } from './mgmt-item.service';
import {
  CreateMgmtItemDto,
  FindMgmtItemDto,
  SaveResultMgmtItemDto,
  UpdateMgmtItemDto,
} from './dto';

@ApiTags('[관리항목] API')
@Controller('mgmt-item')
export class MgmtItemController {
  constructor(
    private readonly mgmtItemService: MgmtItemService,
    private readonly logger: LoggerService,
  ) {}

  //#region 🟩 생성
  @Post()
  @ApiOperation({
    summary: '관리항목 생성',
    description: '관리항목정보를 생성합니다.',
  })
  @ApiBody({
    type: CreateMgmtItemDto,
    isArray: false,
    description: '관리항목 생성 데이터',
  })
  @CustomApiResponse(SaveResultMgmtItemDto, HttpStatus.OK, '생성 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async createData(@Body() createMgmtItemDto: CreateMgmtItemDto) {
    try {
      const mgmtItem: MgmtItem = await this.mgmtItemService.createData(createMgmtItemDto);
      const result: IDataResult<SaveResultMgmtItemDto> = convertSaved(mgmtItem);

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
    summary: '관리항목 전체조회',
    description: '관리항목정보를 조회한다.',
  })
  @CustomApiResponse(FindMgmtItemDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findData() {
    try {
      const mgmtItems: MgmtItem[] = await this.mgmtItemService.findData();

      const findMgmtItemDto: FindMgmtItemDto[] =
        this.mgmtItemService.processingFindResult(mgmtItems);
      const result: IDataResult<FindMgmtItemDto> = convertSaved(findMgmtItemDto);

      return result;
    } catch (err) {
      this.logger.error(this.findData.name, err, 'findData error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 관리항목 조회(UUID)',
    description: 'UUID를 이용하여 특정 관리항목정보를 조회한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리항목UUID' })
  @CustomApiResponse(FindMgmtItemDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async findDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const mgmtItem: MgmtItem = await this.mgmtItemService.findDataById(id);

      const findMgmtItemDto: FindMgmtItemDto[] = this.mgmtItemService.processingFindResult([
        mgmtItem,
      ]);
      const result: IDataResult<FindMgmtItemDto> = convertSaved(findMgmtItemDto);

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
    summary: '관리항목 수정',
    description: '특정 관리항목정보를 수정한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리항목UUID' })
  @ApiBody({
    type: UpdateMgmtItemDto,
    isArray: false,
    description: '수정할 관리항목 데이터',
  })
  @CustomApiResponse(SaveResultMgmtItemDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async updateDataById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMgmtItemDto: UpdateMgmtItemDto,
  ) {
    try {
      const mgmtItem: MgmtItem = await this.mgmtItemService.updateDataById(id, updateMgmtItemDto);
      const result: IDataResult<SaveResultMgmtItemDto> = convertSaved(mgmtItem);

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
    summary: '관리항목 삭제',
    description: '특정 관리항목정보를 삭제한다.',
  })
  @ApiParam({ name: 'id', required: true, description: '관리항목UUID' })
  @CustomApiResponse(SaveResultMgmtItemDto, HttpStatus.OK, '조회 성공')
  @CustomApiResponse(undefined, HttpStatus.INTERNAL_SERVER_ERROR, '서버 에러')
  async deleteDataById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const mgmtItem: MgmtItem = await this.mgmtItemService.deleteDataById(id);
      const result: IDataResult<SaveResultMgmtItemDto> = convertSaved(mgmtItem);

      return result;
    } catch (err) {
      this.logger.error(this.deleteDataById.name, err, 'deleteDataById error!');
      throw new CustomError(err.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  //#endregion
}
