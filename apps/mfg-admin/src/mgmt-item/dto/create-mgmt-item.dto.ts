import { PickType } from '@nestjs/swagger';

import { MgmtItemDto } from '@app/common/dto';

export class CreateMgmtItemDto extends PickType(MgmtItemDto, [
  'team_id',
  'mgmt_type_id',
  'partner',
  'mgmt_item_nm',
]) {}
