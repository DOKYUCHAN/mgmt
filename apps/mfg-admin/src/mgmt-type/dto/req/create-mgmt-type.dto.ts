import { PickType } from '@nestjs/swagger';

import { MgmtTypeDto } from '@app/common/dto';

export class CreateMgmtTypeDto extends PickType(MgmtTypeDto, ['mgmt_type_nm']) {}
