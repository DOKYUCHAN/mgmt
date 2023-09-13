import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

import { TeamSchema } from '@app/schemas';
import { Dept } from '@app/database';

@Exclude()
export class TeamDto implements TeamSchema {
  @ApiProperty({
    type: 'uuid',
    description: '팀 UUID',
    required: true,
    example: uuidv4(),
  })
  @Expose()
  @IsUUID()
  team_id: string;

  @ApiProperty({ type: 'string', description: '팀명', required: true })
  @Expose()
  @IsString()
  team_nm: string;

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
  dept: Dept;
}
