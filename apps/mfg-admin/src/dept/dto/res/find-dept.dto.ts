import { PartialType } from '@nestjs/swagger';

import { DeptDto } from '@app/common/dto';

export class FindDeptDto extends PartialType(DeptDto) {}
