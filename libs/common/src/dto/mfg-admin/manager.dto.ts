import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsOptional, IsString, IsUUID, IsEmail } from 'class-validator';

import { ManagerSchema } from '@app/schemas';

@Exclude()
export class ManagerDto implements ManagerSchema {
  @ApiProperty({
    type: 'uuid',
    description: '담당자 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  manager_id: string;

  @ApiProperty({
    type: 'uuid',
    description: '관리항목 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  mgmt_item_id: string;

  @ApiProperty({ type: 'string', description: '담당자', required: true })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', description: '담당자 이메일', required: true })
  @Expose()
  @IsEmail()
  email: string;

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
