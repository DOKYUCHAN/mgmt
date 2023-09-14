import { ApiProperty, PickType } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { IsUUID } from 'class-validator';

import { ManagerDto } from '@app/common/dto';

export class CreateManagerDto extends PickType(ManagerDto, ['name', 'email']) {
  @ApiProperty({
    type: 'uuid',
    description: '관리항목 UUID',
    required: true,
    example: uuidv4(),
  })
  @IsUUID()
  mgmt_item_id: string;
}
