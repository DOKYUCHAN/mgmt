import { PickType } from '@nestjs/swagger';

import { MgmtItemDto } from '@app/common/dto';

export class UpdateMgmtItemDto extends PickType(MgmtItemDto, [
  'mgmt_type_id',
  'partner',
  'mgmt_item_nm',
]) {}
