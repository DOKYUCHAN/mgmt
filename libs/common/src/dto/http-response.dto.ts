import { ApiProperty } from '@nestjs/swagger';

import { IDataResult } from '@app/interfaces';

const getResMessage = (method: string) => {
  switch (method.toUpperCase()) {
    case 'POST':
      return '생성 성공';
    case 'GET':
      return '조회 성공';
    case 'PUT':
      return '수정 성공';
    case 'PATCH':
      return '수정 성공';
    case 'DELETE':
      return '삭제 성공';
    default:
      return '실행 완료';
  }
};

export class HttpResponseDto<T> {
  @ApiProperty({
    type: 'boolean',
    description: '결과 여부',
    required: true,
  })
  result: boolean;

  @ApiProperty({
    type: 'string',
    description: '결과 코드',
    required: true,
  })
  code: string;

  @ApiProperty({
    type: 'string',
    description: '결과 메시지',
    required: true,
  })
  message: string;

  @ApiProperty({
    type: 'object',
    description: '결과 데이터',
    required: false,
  })
  data?: IDataResult<T>;

  constructor(result: boolean, method: string, data?: IDataResult<T>) {
    this.result = result;
    this.code = 'OK';
    this.message = getResMessage(method);
    this.data = data;
  }
}
