import { PickType } from '@nestjs/swagger';

import { DeptDto } from '@app/common/dto';

export class CreateDeptDto extends PickType(DeptDto, ['dept_nm']) {}
