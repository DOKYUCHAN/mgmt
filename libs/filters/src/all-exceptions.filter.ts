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
      const responseResult = {
        result: false,
        message:
          errorResponse.error.errorCode === ERROR_CODE.DEFINED_ERROR
            ? errorResponse.error.message
            : '통신 중 문제가 발생하였습니다.',
        data: { count: 0, rows: [] },
      };

      response.status(errorResponse.status).json(responseResult);

      // 📌 🟥 Error Log & Response
      const config = configurations();
      if (config.APP.ENV === ENVIRONMENT.PRODUCTION) {
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
