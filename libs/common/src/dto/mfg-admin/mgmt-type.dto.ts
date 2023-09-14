import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

import { MgmtTypeSchema } from '@app/schemas';

@Exclude()
export class MgmtTypeDto implements MgmtTypeSchema {
  @ApiProperty({
    type: 'uuid',
    description: '관리유형 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  mgmt_type_id: string;

  @ApiProperty({ type: 'string', description: '관리유형명', required: true })
  @Expose()
  @IsString()
  mgmt_type_nm: string;

  @ApiProperty({
    type: 'datetime',
    description: '생성 일시',
    example: new Date(),
  })
  @Expose()
  @IsDate()
  created_at: Date;

  @ApiProperty({
    type: 'datetime',
    description: '수정 일시',
    example: new Date(),
  })
  @Expose()
  @IsDate()
  updated_at: Date;

  @ApiProperty({
    type: 'datetime',
    description: '삭제 일시',
    example: new Date(),
  })
  @Expose()
  @IsDate()
  deleted_at: Date;
}
