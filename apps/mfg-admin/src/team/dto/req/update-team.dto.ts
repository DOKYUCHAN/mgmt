import { ApiProperty, PickType } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsOptional, IsUUID } from 'class-validator';

import { TeamDto } from '@app/common/dto';

export class UpdateTeamDto extends PickType(TeamDto, ['team_nm']) {
  @ApiProperty({
    type: 'uuid',
    description: '부서 UUID',
    required: false,
    example: uuidv4(),
  })
  @IsOptional()
  @IsUUID()
  dept_id: string;
}
