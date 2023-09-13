import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

import { TeamDto } from '@app/common/dto';

export class FindTeamDto extends PartialType(OmitType(TeamDto, ['dept'])) {
  @ApiProperty({
    type: 'uuid',
    description: '부서 UUID',
    required: false,
    example: uuidv4(),
  })
  dept_id: string;

  @ApiProperty({ type: 'string', description: '부서명' })
  dept_nm: string;
}
