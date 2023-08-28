import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

import { DeptSchema } from '@app/schemas';

@Exclude()
export class DeptDto implements DeptSchema {
  @ApiProperty({
    type: 'uuid',
    description: '부서 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  dept_id: string;

  @ApiProperty({ type: 'string', description: '부서명', required: true })
  @Expose()
  @IsString()
  dept_nm: string;

  @ApiProperty({
    type: 'datetime',
    description: '생성 일시',
    example: new Date(),
  })
  @Expose()
  @IsOptional()
  @IsDate()
  created_at: Date;

  @ApiProperty({
    type: 'datetime',
    description: '수정 일시',
    example: new Date(),
  })
  @Expose()
  @IsOptional()
  @IsDate()
  updated_at: Date;

  @ApiProperty({
    type: 'datetime',
    description: '삭제 일시',
    example: new Date(),
  })
  @Expose()
  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
