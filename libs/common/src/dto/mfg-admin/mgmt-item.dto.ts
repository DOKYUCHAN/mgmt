import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

import { MgmtItemSchema } from '@app/schemas';
import { MgmtType, Team } from '@app/database';

@Exclude()
export class MgmtItemDto implements MgmtItemSchema {
  @ApiProperty({
    type: 'uuid',
    description: '관리항목 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  mgmt_item_id: string;

  @ApiProperty({ type: 'string', description: '고객사', required: true })
  @Expose()
  @IsString()
  partner: string;

  @ApiProperty({ type: 'string', description: '관리항목명', required: true })
  @Expose()
  @IsString()
  mgmt_item_nm: string;

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

  // 📌 Relational Variables
  team: Team;
  mgmtType: MgmtType;
}
