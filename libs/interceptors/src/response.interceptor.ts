import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

import { HttpResponseDto } from '@app/common/dto';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const httpMethod = context.switchToHttp().getRequest()?.method;
      const httpContext = context.switchToHttp();
      return next.handle().pipe(
        map((value) => {
          const httpRes = new HttpResponseDto(true, httpMethod, value);
          httpContext.getResponse().status(HttpStatus.OK).json(httpRes);
        }),
      );
    }
    return next.handle().pipe(
      map((value) => {
        return { status: 200, data: value };
      }),
    );
  }
}
