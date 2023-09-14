import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@app/common/dto';

export const CustomApiResponse = <TModel extends Type<any>>(
  model: TModel,
  status: number,
  description: string,
) => {
  if (model) {
    return applyDecorators(
      ApiExtraModels(HttpResponseDto, model),
      ApiResponse({
        description,
        status,
        schema: {
          allOf: [
            {
              properties: {
                result: {
                  type: 'boolean',
                  nullable: false,
                  description: '결과 여부',
                  example: true,
                },
                message: {
                  type: 'string',
                  nullable: false,
                  description: '결과 메시지',
                  example: '성공',
                },
                data: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'number',
                      nullable: false,
                      description: '결과 개수',
                      example: 0,
                    },
                    rows: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: getSchemaPath(model),
                      },
                      nullable: false,
                      description: '결과 데이터',
                    },
                  },
                },
              },
            },
          ],
        },
      }),
    );
  } else {
    return applyDecorators(
      ApiResponse({
        description,
        status,
        schema: {
          allOf: [
            {
              properties: {
                result: {
                  type: 'boolean',
                  nullable: false,
                  description: '결과 여부',
                  example: false,
                },
                message: {
                  type: 'string',
                  nullable: false,
                  description: '결과 메시지',
                  example: '에러',
                },
                data: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'number',
                      nullable: false,
                      description: '결과 개수',
                      example: 0,
                    },
                    rows: {
                      type: 'array',
                      nullable: false,
                      example: [],
                      description: '결과 데이터',
                    },
                  },
                },
              },
            },
          ],
        },
      }),
    );
  }
};
