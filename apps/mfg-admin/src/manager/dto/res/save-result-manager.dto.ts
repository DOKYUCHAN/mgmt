import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { ManagerDto } from '@app/common/dto';

export class SaveResultManagerDto extends PartialType(OmitType(ManagerDto, ['mgmtItem'])) {
  @ApiProperty({ type: 'string', description: '관리항목UUID' })
  mgmt_item_id: string;
}
