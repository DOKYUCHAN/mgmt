import { PickType } from '@nestjs/swagger';

import { ManagerDto } from '@app/common/dto';

export class CreateManagerDto extends PickType(ManagerDto, ['mgmt_item_id', 'name', 'email']) {}
