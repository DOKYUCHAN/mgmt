import { PartialType } from '@nestjs/swagger';

import { MgmtTypeDto } from '@app/common/dto';

export class SaveResultMgmtTypeDto extends PartialType(MgmtTypeDto) {}
