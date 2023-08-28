import { PickType } from '@nestjs/swagger';

import { TeamDto } from '@app/common/dto';

export class CreateTeamDto extends PickType(TeamDto, ['dept_id', 'team_nm']) {}
