import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TLogInfo } from '@app/types';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class LoggerService {
  context: string;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly winstonLogger: WinstonLogger,
    @Inject(INQUIRER) private readonly parentClass: object,
  ) {
    this.context = this.parentClass?.constructor?.name || 'Unknown';
  }

  private format(obj: object | string, message = '') {
    const result: TLogInfo = { message };
    if (obj instanceof Error) {
      result.stack = obj.stack;
      return result;
    }

    if (typeof obj === 'string') {
      result.message = `${obj} ${message}`;
    } else {
      result.data = obj;
    }

    return result;
  }

  setContext(context: string) {
    this.context = context;
  }

  verbose(detailedContext: string, object: object | string, message?: string) {
    const result = this.format(object, message);
    this.winstonLogger.verbose(result, `${this.context}/${detailedContext}`);
  }

  debug(detailedContext: string, object: object | string, message?: string) {
    const result = this.format(object, message);
    this.winstonLogger.debug(result, `${this.context}/${detailedContext}`);
  }

  info(detailedContext: string, object: object | string, message?: string) {
    const result = this.format(object, message);
    this.winstonLogger.log(result, `${this.context}/${detailedContext}`);
  }

  warn(detailedContext: string, object: object | string, message?: string) {
    const result = this.format(object, message);
    this.winstonLogger.warn(result, `${this.context}/${detailedContext}`);
  }

  error(detailedContext: string, object: object | string, message?: string) {
    const result = this.format(object, message);
    this.winstonLogger.error(result, undefined, `${this.context}/${detailedContext}`);
  }
}
