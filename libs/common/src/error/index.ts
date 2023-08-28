import { TErrorCode } from './code';

/**
 * ErrorCode를 활용할 수 있는 형태의 Error 정의.
 */
export class CustomError extends Error {
  /**
   *
   * @param {TErrorCode} errorCode
   * @param {string} message
   * @param {any} info
   */
  errorCode: TErrorCode;

  info: any;

  constructor(errorCode: TErrorCode, message: string, info?: any) {
    super(message);
    this.errorCode = errorCode;
    this.info = info;
    Error.captureStackTrace(this, this.constructor);
  }
}

export * from './code';
