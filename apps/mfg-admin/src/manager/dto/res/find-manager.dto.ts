import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { ManagerDto } from '@app/common/dto';

export class FindManagerDto extends PartialType(OmitType(ManagerDto, ['mgmtItem'])) {
  @ApiProperty({ type: 'string', description: '관리항목UUID' })
  mgmt_item_id: string;

  @ApiProperty({ type: 'string', description: '관리항목명' })
  mgmt_item_nm: string;
}
