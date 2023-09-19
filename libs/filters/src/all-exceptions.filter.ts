import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

import { LoggerService } from '@app/common/logger';
import { configurations } from '@app/common/config';
import { HttpErrorResponseDto } from '@app/common/dto';
import { ERROR_CODE } from '@app/common/error';
import { createErrorLog } from '@app/utils';
import { ICreateErrorLog } from '@app/interfaces';
import { ENVIRONMENT } from '@app/constants';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    super();
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const ctx = host.switchToHttp();
      const response: Response = ctx.getResponse();
      const errorResponse = new HttpErrorResponseDto(exception);

      let errorMessage = '';
      const responseData = { count: 0, rows: [] };
      const { error, status } = errorResponse;
      switch (error.errorCode) {
        case ERROR_CODE.DEFINED_ERROR:
          errorMessage = error.message;
          break;
        case ERROR_CODE.VALIDATION_ERROR:
          errorMessage = error.message;
          responseData.rows = exception?.info;
          responseData.count = responseData.rows.length;
          break;
        default:
          errorMessage = '통신 중 문제가 발생하였습니다.';
          break;
      }

      const responseResult = {
        result: false,
        result_code: error.errorCode,
        message: errorMessage,
        data: responseData,
      };
      response.status(status).json(responseResult);

      // 📌 🟥 Error Log & Response
      const config = configurations();
      if (config.APP.ENV !== ENVIRONMENT.LOCAL) {
        const errLog: ICreateErrorLog = {
          request: {
            uri: response.req.url,
            method: response.req.method,
            body: response.req.body,
            params: response.req.params,
            query: response.req.query,
          },
          error: {
            response: responseResult,
            value: errorResponse,
          },
        };
        createErrorLog(errLog);
      }

      this.logger.error(AllExceptionsFilter.name, exception, `[EXCEPTION_FILTER/ORIGIN_EXCEPTION]`);
    }
  }
}
