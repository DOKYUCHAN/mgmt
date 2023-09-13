import { PickType } from '@nestjs/swagger';

import { ManagerDto } from '@app/common/dto';

export class UpdateManagerDto extends PickType(ManagerDto, ['name', 'email']) {}
