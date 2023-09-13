import { HttpStatus } from '@nestjs/common';

import { TErrorCode, CustomError, ERROR_CODE, ERROR_CODE_STATUS_MAPPING } from '../error';

const getErrorStatusCode = (errorCode: TErrorCode) => ERROR_CODE_STATUS_MAPPING[errorCode];

class ErrorInfo {
  errorCode: string;

  message: string;

  stack?: string;
}

export class HttpErrorResponseDto {
  status: number;

  error: ErrorInfo;

  constructor(errorObj: Error) {
    const errorInfo: ErrorInfo = {
      errorCode: ERROR_CODE.INTERNAL_SERVER_ERROR,
      message: errorObj.message,
    };
    this.status = errorObj['status'] || HttpStatus.INTERNAL_SERVER_ERROR;

    if (errorObj instanceof CustomError) {
      const status = getErrorStatusCode(errorObj.errorCode);
      this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
      errorInfo.errorCode = errorObj.errorCode || ERROR_CODE.INTERNAL_SERVER_ERROR;
    }

    errorInfo.stack = errorObj.stack;
    this.error = errorInfo;
  }
}
