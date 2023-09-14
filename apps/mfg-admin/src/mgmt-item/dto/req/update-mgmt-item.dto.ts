import { ApiProperty, PickType } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsUUID } from 'class-validator';

import { MgmtItemDto } from '@app/common/dto';

export class UpdateMgmtItemDto extends PickType(MgmtItemDto, ['partner', 'mgmt_item_nm']) {
  @ApiProperty({
    type: 'uuid',
    description: '관리유형 UUID',
    required: true,
    example: uuidv4(),
  })
  @IsUUID()
  mgmt_type_id: string;
}
