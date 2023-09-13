import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { MgmtItemDto } from '@app/common/dto';

export class FindMgmtItemDto extends PartialType(OmitType(MgmtItemDto, ['team', 'mgmtType'])) {
  @ApiProperty({ type: 'string', description: '팀UUID' })
  team_id: string;

  @ApiProperty({ type: 'string', description: '팀명' })
  team_nm: string;

  @ApiProperty({ type: 'string', description: '관리유형UUID' })
  mgmt_type_id: string;

  @ApiProperty({ type: 'string', description: '관리유형명' })
  mgmt_type_nm: string;
}
